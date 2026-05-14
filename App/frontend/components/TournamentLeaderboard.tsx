'use client';
import React from "react";
import useSWR from 'swr';
import { useState } from "react";

import { Badge, Collapse, Spinner, Flex, Box, Text, VStack, Divider } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || `Request failed with status ${res.status}`);
    }
    return res.json();
};

interface LeaderboardProps {
    initialData?: any;
}

export default function LeaderboardTable({ initialData }: LeaderboardProps) {
    const { data: leaderboard, error, isLoading } = useSWR('/api/leaderboard', fetcher, {
        fallbackData: initialData, // Uses server data immediately
        refreshInterval: 120000,   // Polls every 2 minutes
        revalidateOnFocus: true    // Auto-updates when you click back onto the tab
    });
    const getToastPlace
        = (place: number): string => {
            if (place === 1) return "1st";
            if (place === 2) return "2nd";
            if (place === 3) return "3rd";
            if (place === 1000) return "CUT";
            return place + "th";
        }
    const users = leaderboard?.Teams || [];
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (isLoading && !leaderboard) {
        return (
            <Flex justify="center" align="center" minH="200px">
                <Spinner size="xl" />
            </Flex>
        );
    }

    if (error) {
        return <Text textAlign="center" color="red.500" mt={4}>Failed to load leaderboard.</Text>;
    }

    if (!users.length) {
        return <Text textAlign="center" mt={4}>Results coming soon.</Text>;
    }

    const worstInTop25 = leaderboard?.worstTop25 || "";

    return (
        <VStack spacing={3} px={4} py={2} align="stretch">
            {users.map((user: any, index: number) => (
                <Box
                    key={index}
                    borderWidth="1px"
                    borderRadius="md"
                    overflow="hidden"
                    bg="gray.50"
                    borderColor="gray.200"
                >
                    {/* Clickable Header */}
                    <Box
                        p={3}
                        cursor="pointer"
                        onClick={() => toggle(index)}
                    >
                        <Flex align="center">
                            <Box flex="1">
                                <Flex align="center" gap={2}>
                                    <Text fontWeight="bold">{user.Name}</Text>

                                    {user.AllCut && (
                                        <Badge
                                            colorScheme="green"
                                            fontSize="0.6em"
                                            borderRadius="full"
                                        >
                                            ALL CUT
                                        </Badge>
                                    )}
                                    {user.WorstRankedBonus && (
                                        <Badge
                                            colorScheme="red"
                                            fontSize="0.6em"
                                            borderRadius="full"
                                        >
                                            HIGHEST RANKED IN TOP 25
                                        </Badge>
                                    )}
                                </Flex>

                                <Text fontSize="sm" color="gray.500">
                                    Position: {user.Place}
                                </Text>
                            </Box>


                            <Text
                                fontWeight="bold"
                                textAlign="right"
                                minW="60px"
                            >
                                {user["Total Score"]}
                            </Text>
                            <ChevronDownIcon
                                transform={openIndex === index ? "rotate(180deg)" : "rotate(0deg)"}
                                transition="0.2s"
                            />
                        </Flex>
                    </Box>


                    {/* Expandable Section */}
                    <Collapse in={openIndex === index} animateOpacity>
                        <Box px={4} pb={3}>
                            <VStack align="stretch" spacing={0} px={0}>
                                {user.Roster.map((player: any, i: number) => (
                                    <React.Fragment key={i}>
                                        <Flex
                                            p={2}
                                            align="center"
                                            justify="space-between"
                                            gap={2}
                                        >
                                            {/* Left: Name + icons */}
                                            <Flex align="center" gap={1}>
                                                {player.Finish === 1 && "🏆"}
                                                <Text fontWeight="medium">{player.Name}</Text>
                                                <Text fontSize="sm" color="gray.600">
                                                    ({player.Finish === 1001 ? "N/A" : getToastPlace(player.Finish)})
                                                </Text>
                                                {player.Name === worstInTop25 && (
                                                    <Badge colorScheme="red" fontSize="0.6em" borderRadius="full">
                                                        WORST RANKED TOP 25
                                                    </Badge>
                                                )}
                                            </Flex>

                                            {/* Right: Finish + points */}
                                            <Flex align="center" gap={1}>
                                                <Text fontSize="sm" fontWeight="bold">
                                                    {player["Points scored"]} pts
                                                </Text>
                                            </Flex>
                                        </Flex>

                                        {/* Divider after each player except the last one */}
                                        {i < user.Roster.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </VStack>
                        </Box>

                    </Collapse>
                </Box>
            ))}
        </VStack>

    );
}