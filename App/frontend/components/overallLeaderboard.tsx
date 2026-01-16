'use client';
import React, { useEffect, useState } from "react";
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
    Spinner
} from "@chakra-ui/react";


const OverallLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<any>(null);
    const [teams, setTeams] = useState<any[]>([]);
    const [sortField, setSortField] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
    const handleSort = (field: string) => {
        if (sortField === field) {
            // Toggle direction
            setSortDirection("desc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

const sortedTeams = React.useMemo(() => {
  if (!sortField) return teams;

  return [...teams].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (typeof aValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
  });
}, [teams, sortField, sortDirection]);

    useEffect(() => {
        let intervalId;

        async function fetchLeaderboard() {
            try {
                const res = await fetch("/api/overall");
                const data = await res.json();
                setLeaderboard(data);
                setTeams(data?.Teams || []);
            } catch (err) {
                console.error("Failed to fetch overall leaderboard:", err);
            }
        }

        // Initial fetch
        fetchLeaderboard();

        // Set interval to fetch every 2 minutes (120000 ms)
        intervalId = setInterval(fetchLeaderboard, 120000);

        // Cleanup interval on unmount
        return () => clearInterval(intervalId);
    }, []);
    return (
        <div>
            <TableContainer minWidth="100%">
                <Table variant="simple" size="xs" sx={{ tableLayout: "auto" }}>
<TableCaption placement="top">
  <Text fontSize="2xl" fontWeight="bold" mb={1} textAlign="center">
    2025 Overall Results
  </Text>
  <Text fontSize="lg" color="gray.500" textAlign="center">
    Click tournament name to sort by that event's score
  </Text>
</TableCaption>
                    <Thead bg="blue.800">
                        <Tr>
                            <Th border="1px solid" borderColor="gray.300" textAlign="center" color="yellow.400">Place</Th>
                            <Th border="1px solid" borderColor="gray.300" textAlign="center" color="yellow.400">Name</Th>
                            <Th border="1px solid" borderColor="gray.300" textAlign="center" color="yellow.400" cursor="pointer" onClick={() => handleSort("masters")}>Masters</Th>
                            <Th border="1px solid" borderColor="gray.300" textAlign="center" color="yellow.400" cursor="pointer" onClick={() => handleSort("pga")}>PGA CHAMP</Th>
                            <Th border="1px solid" borderColor="gray.300" textAlign="center" color="yellow.400" cursor="pointer" onClick={() => handleSort("US")}>US Open</Th>
                            <Th border="1px solid" borderColor="gray.300" textAlign="center" color="yellow.400" cursor="pointer" onClick={() => handleSort("open")}>Open Champ</Th>
                            <Th border="1px solid" borderColor="gray.300" textAlign="center" color="yellow.400" cursor="pointer" onClick={() => handleSort("total")}>Total Score</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sortedTeams.map((user: any, index) => (
                            <Tr
                                key={index}
                                bg={"transparent"}
                                _hover={{ bg: "gray.200" }}
                            >
                                <Td border="1px solid" borderColor="gray.300" textAlign="center" color="blue.800">{user.place}</Td>
                                <Td border="1px solid" borderColor="gray.300" textAlign="center" color="blue.800"><strong>{user.name}</strong></Td>
                                <Td border="1px solid" borderColor="gray.300" textAlign="center" color="blue.800">{user.masters}</Td>
                                <Td border="1px solid" borderColor="gray.300" textAlign="center" color="blue.800">{user["pga"]}</Td>
                                <Td border="1px solid" borderColor="gray.300" textAlign="center" color="blue.800">{user.US}</Td>
                                <Td border="1px solid" borderColor="gray.300" textAlign="center" color="blue.800">{user["open"]}</Td>
                                <Td border="1px solid" borderColor="gray.300" textAlign="center" color="blue.800">{user["total"]}</Td>
                            </Tr>
                        ))}

                    </Tbody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default OverallLeaderboard
