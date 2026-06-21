'use client';

import { useEffect, useState, useMemo } from 'react';
import {
    Box,
    Flex,
    Spinner,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';

export default function playerCounts() {
    const secondaryColor = "rgb(37, 50, 85)";
    const primaryColor = "rgb(183, 149, 90)";

    const [players, setPlayers] = useState<
        { name: string; count: number }[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        async function fetchPlayerCounts() {
            try {
                const res = await fetch('/api/player-counts');
                const data = await res.json();

                const playerArray = Object.entries(data).map(
                    ([name, count]) => ({
                        name,
                        count: Number(count),
                    })
                );

                setPlayers(playerArray);
            } catch (err) {
                console.error('Failed to fetch player counts', err);
            } finally {
                setLoading(false);
            }
        }

        fetchPlayerCounts();
    }, []);

    const sortedPlayers = useMemo(() => {
        return [...players].sort((a, b) =>
            sortDirection === 'desc'
                ? b.count - a.count
                : a.count - b.count
        );
    }, [players, sortDirection]);

    if (loading) {
        return (
            <Flex justify="center" align="center" minH="40vh">
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <Box p={6} maxW="900px" mx="auto">
            <Text
                fontSize="4xl"
                fontWeight="black"
                textAlign="center"
                mb={6}
                color={secondaryColor}
            >
                Player Ownership
            </Text>

            <TableContainer
                bg="white"
                boxShadow="xl"
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
            >
                <Table>
                    <Thead bg={secondaryColor}>
                        <Tr>
                            <Th color={primaryColor}>Player</Th>

                            <Th
                                color={primaryColor}
                                textAlign="center"
                                cursor="pointer"
                                onClick={() =>
                                    setSortDirection(
                                        sortDirection === 'desc'
                                            ? 'asc'
                                            : 'desc'
                                    )
                                }
                            >
                                Times Selected{' '}
                                {sortDirection === 'desc' ? '▼' : '▲'}
                            </Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {sortedPlayers.map((player, index) => (
                            <Tr key={player.name}>
                                <Td fontWeight="bold">
                                    {player.name}
                                </Td>

                                <Td
                                    textAlign="center"
                                    fontWeight="black"
                                >
                                    {player.count}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}