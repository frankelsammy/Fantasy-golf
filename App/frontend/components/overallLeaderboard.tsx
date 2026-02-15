'use client';
import React, { useEffect, useState, useMemo } from "react";
import {
    Table,
    Thead,
    Tbody,
    Text,
    Tr,
    Th,
    Td,
    TableContainer,
    TableCaption,
    Spinner,
    Box,
    Flex,
    Badge,
    Divider,
    useBreakpointValue,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Icon
} from "@chakra-ui/react";

// Simple Chevron Icon SVG since it's common
const ChevronDownIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
    </svg>
);

const OverallLeaderboard = () => {
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState<string>("total");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

    const isMobile = useBreakpointValue({ base: true, md: false });

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    const sortedTeams = useMemo(() => {
        if (!sortField) return teams;

        return [...teams].sort((a, b) => {
            const aValue = a[sortField] ?? 999;
            const bValue = b[sortField] ?? 999;

            if (typeof aValue === "string") {
                return sortDirection === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }
            return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        });
    }, [teams, sortField, sortDirection]);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const res = await fetch("/api/overall");
                const data = await res.json();
                setTeams(data?.Teams || []);
            } catch (err) {
                console.error("Failed to fetch overall leaderboard:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchLeaderboard();
        const intervalId = setInterval(fetchLeaderboard, 120000);
        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return (
            <Flex justify="center" align="center" minH="40vh">
                <Spinner size="xl" color="blue.500" thickness="4px" />
            </Flex>
        );
    }

    return (
        <Box p={{ base: 2, md: 6 }} maxW="1200px" mx="auto">
            {/* Header Section */}
            <Box mb={6} textAlign="center">
                <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="black" color="blue.800">
                    2025 Overall Results
                </Text>
            </Box>

            {isMobile ? (
                /* --- MOBILE LAYOUT --- */
                <Box>
                    <Flex justify="center" mb={6}>
                        <Menu>
                            <MenuButton 
                                as={Button} 
                                rightIcon={<ChevronDownIcon />} 
                                colorScheme="blue" 
                                variant="solid"
                                boxShadow="md"
                                width="full"
                            >
                                Sorting by: {sortField.toUpperCase()} 
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => handleSort("total")}>Total Score</MenuItem>
                                <MenuItem onClick={() => handleSort("masters")}>Masters</MenuItem>
                                <MenuItem onClick={() => handleSort("pga")}>PGA Champ</MenuItem>
                                <MenuItem onClick={() => handleSort("US")}>US Open</MenuItem>
                                <MenuItem onClick={() => handleSort("open")}>Open Champ</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>

                    <Flex direction="column" gap={4}>
                        {sortedTeams.map((user, index) => (
                            <Box 
                                key={index} 
                                p={4} 
                                borderRadius="xl" 
                                bg="white" 
                                border="1px solid" 
                                borderColor="gray.200"
                                boxShadow="sm"
                            >
                                <Flex justify="space-between" align="center">
                                    <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>
                                        #{user.place}
                                    </Badge>
                                    <Text fontWeight="bold" fontSize="lg" color="blue.900">{user.name}</Text>
                                    <Box textAlign="right">
                                        <Text fontSize="10px" fontWeight="bold" color="gray.400">TOTAL</Text>
                                        <Text fontSize="xl" fontWeight="black" color="blue.600">{user.total}</Text>
                                    </Box>
                                </Flex>
                                
                                <Divider my={3} />
                                
                                <Flex justify="space-between" gap={2}>
                                    <ScoreBox label="Masters" val={user.masters} active={sortField === "masters"} />
                                    <ScoreBox label="PGA" val={user.pga} active={sortField === "pga"} />
                                    <ScoreBox label="US Open" val={user.US} active={sortField === "US"} />
                                    <ScoreBox label="Open" val={user.open} active={sortField === "open"} />
                                </Flex>
                            </Box>
                        ))}
                    </Flex>
                </Box>
            ) : (
                /* --- DESKTOP LAYOUT --- */
                <TableContainer bg="white" boxShadow="xl" borderRadius="lg" border="1px solid" borderColor="gray.200">
                    <Table variant="simple" size="md">
                        <Thead bg="blue.800">
                            <Tr>
                                <Th color="yellow.400" textAlign="center">Rank</Th>
                                <Th color="yellow.400">Team Name</Th>
                                {["masters", "pga", "US", "open", "total"].map((header) => (
                                    <Th 
                                        key={header}
                                        color="yellow.400" 
                                        textAlign="center" 
                                        cursor="pointer" 
                                        onClick={() => handleSort(header)}
                                        _hover={{ bg: "blue.700" }}
                                    >
                                        {header.toUpperCase()} {sortField === header ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                                    </Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {sortedTeams.map((user: any, index) => (
                                <Tr key={index} _hover={{ bg: "gray.50" }} transition="0.2s">
                                    <Td textAlign="center" fontWeight="bold">{user.place}</Td>
                                    <Td color="blue.800" fontWeight="extrabold">{user.name}</Td>
                                    <Td textAlign="center">{user.masters}</Td>
                                    <Td textAlign="center">{user.pga}</Td>
                                    <Td textAlign="center">{user.US}</Td>
                                    <Td textAlign="center">{user.open}</Td>
                                    <Td textAlign="center" fontWeight="black" color="blue.600" bg="blue.50">{user.total}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

// Helper component for mobile score tiles
const ScoreBox = ({ label, val, active }: { label: string, val: any, active: boolean }) => (
    <Box 
        flex="1" 
        textAlign="center" 
        p={2} 
        borderRadius="md" 
        bg={active ? "blue.50" : "gray.50"}
        border="1px solid"
        borderColor={active ? "blue.200" : "transparent"}
    >
        <Text fontSize="9px" fontWeight="bold" color="gray.500" textTransform="uppercase">{label}</Text>
        <Text fontSize="sm" fontWeight="bold" color={active ? "blue.700" : "gray.800"}>{val}</Text>
    </Box>
);

export default OverallLeaderboard;