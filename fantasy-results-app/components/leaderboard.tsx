'use client';
import React, { useEffect, useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    TableCaption,
    Spinner,
} from "@chakra-ui/react";

export default function LeaderboardTable() {
    const [leaderboard, setLeaderboard] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getName = (fullName: string, finish: number) => {
        const lastName = fullName?.split(" ").pop() || "";
        const finishText =
            finish === 1000 ? " (CUT)" : finish ? ` (${finish})` : "";
        return lastName + finishText;
    };

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const res = await fetch("/api/leaderboard");
                const data = await res.json();
                setLeaderboard(data); // full document
                setUsers(data?.Teams || []); // extract teams for the table
            } catch (err) {
                console.error("Failed to fetch leaderboard:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchLeaderboard();
    }, []);

    if (loading)
        return (
            <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
                <Spinner size="xl" />
            </div>
        );

    if (!users.length) return <p>No users found.</p>;

    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <TableContainer minWidth="100%">
                <Table variant="simple" size="xs" sx={{ tableLayout: "auto" }}>
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
                        {users.map((user: any, index) => (
                            <Tr
                                key={index}
                                bg={user.AllCut ? "yellow.200" : index % 2 === 0 ? "gray.50" : "white"}
                                _hover={{ bg: "gray.200" }}
                            >
                                <Td border="1px solid" borderColor="gray.300" textAlign="center" color="blue.800">{user.Place}</Td>
                                <Td border="1px solid" borderColor="gray.300" textAlign="center" color="blue.800">{user.Name}</Td>
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
