'use client';
import React from "react";
import useSWR from 'swr';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    TableCaption,
    Spinner
} from "@chakra-ui/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface LeaderboardProps {
    initialData?: any;
}

export default function LeaderboardTable({ initialData }: LeaderboardProps) {

    const { data: leaderboard, error, isLoading } = useSWR('/api/leaderboard', fetcher, {
        fallbackData: initialData, // Uses server data immediately
        refreshInterval: 120000,   // Polls every 2 minutes
        revalidateOnFocus: true    // Auto-updates when you click back onto the tab
    });

    const users = leaderboard?.Teams || [];

    const getName = (fullName: string, finish: number) => {
        const lastName = fullName?.split(" ").pop() || "";
        const finishText =
            finish === 1000 ? " (CUT)" : finish ? ` (${finish})` : "";
        return lastName + finishText;
    };

    if (isLoading && !leaderboard)
        return (
            <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
                <Spinner size="xl" />
            </div>
        );

    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Failed to load leaderboard.</p>;
    if (!users.length) return <p style={{ textAlign: 'center', marginTop: '20px' }}>No users found.</p>;

    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <TableContainer minWidth="100%">
                <Table variant="simple" size="xs" fontSize="sm" sx={{ tableLayout: "auto" }}>
                    <TableCaption placement="top" fontSize="lg" fontWeight="bold">
                        Teams highlighted yellow indicate everyone on the team made the cut (15 bonus points)
                        <br />
                        Teams with {leaderboard?.worstTop25} get 15 bonus points (lowest ranked chosen player in top 25)
                        <br />
                        Last Updated: {leaderboard?.Date}
                    </TableCaption>

                    <Thead bg="blue.800">
                        <Tr>
                            <Th border="1px solid" borderColor="gray.300" textAlign="center" color="yellow.400">Place</Th>
                            <Th border="1px solid" borderColor="gray.300" textAlign="center" color="yellow.400">Name</Th>
                            {[...Array(8)].map((_, i) => (
                                <React.Fragment key={i}>
                                    <Th border="1px solid" borderColor="gray.300" textAlign="center" color="yellow.400">{`Player ${i + 1}`}</Th>
                                    <Th border="1px solid" borderColor="gray.300" textAlign="center" color="yellow.400">PTS</Th>
                                </React.Fragment>
                            ))}
                            <Th border="1px solid" borderColor="gray.300" textAlign="center" color="yellow.400">Total Score</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {users.map((user: any, index: number) => (
                            <Tr
                                key={index}
                                bg={user.AllCut ? "yellow.200" : "white"}
                                _hover={{ bg: "gray.200" }}
                            >
                                <Td border="1px solid" borderColor="gray.300" textAlign="center" color="blue.800">{user.Place}</Td>
                                <Td border="1px solid" borderColor="gray.300" textAlign="center" color="blue.800"><strong>{user.Name}</strong></Td>
                                {user.Roster?.map((player: any, i: number) => (
                                    <React.Fragment key={i}>
                                        <Td border="1px solid" borderColor="gray.300" textAlign="center" color="blue.800">{getName(player.Name, player.Finish)}</Td>
                                        <Td border="1px solid" borderColor="gray.300" textAlign="center" color="blue.800">{player["Points scored"] ?? "N/A"}</Td>
                                    </React.Fragment>
                                ))}
                                <Td border="1px solid" borderColor="gray.300" textAlign="center" color="blue.800">{user["Total Score"]}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
}