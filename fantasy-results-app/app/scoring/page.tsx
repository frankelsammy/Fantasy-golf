'use client';
import React from 'react';
import Navbar from "@/components/navbar";
import {
  Box,
  Heading,
  VStack,
  Text,
  List,
  ListItem,
  ListIcon,
  Divider,
  Container,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const Links = [
  { label: "Home", href: "/" },
  { label: "Overall Leaderboard", href: "/overall" },
  { label: "World Power Rankings", href: "https://datagolf.com/datagolf-rankings" },
];

const ScoringPage = () => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar Links={Links} />

<Container maxW="container.md" py={10}>
  <VStack spacing={8} align="stretch" textAlign="left">
    <Heading as="h1" size="2xl" textAlign="center" mb={6}>
      2025 Scoring System
    </Heading>

    {/* Rules Box */}
    <Box
      bg="white"
      p={8}              // padding inside the box
      borderRadius="lg"  // rounded corners
      shadow="lg"        // subtle shadow
      borderWidth="1px"  // optional border
      borderColor="gray.200"
    >
      {/* Multiplier Bonuses */}
      <Box mb={6}>
        <Heading as="h2" size="lg" mb={3}>
          Multiplier Bonuses
        </Heading>
        <List spacing={2}>
          <ListItem>
            <ListIcon as={StarIcon} color="green.500" />
            Your 1st pick's score is multiplied by 2
          </ListItem>
          <ListItem>
            <ListIcon as={StarIcon} color="green.500" />
            Your 2nd pick's score is multiplied by 1.5
          </ListItem>
        </List>
      </Box>

      <Divider />

      {/* Placement Scoring */}
      <Box my={6}>
        <Heading as="h2" size="lg" mb={3}>
          Placement Scoring
        </Heading>
        <List spacing={2}>
          <ListItem>
            <ListIcon as={StarIcon} color="blue.500" />
            5 points for making the cut (except players ranked 1-5)
          </ListItem>
          <ListItem>
            <ListIcon as={StarIcon} color="blue.500" />
            3 points for making the top 25
          </ListItem>
          <ListItem>
            <ListIcon as={StarIcon} color="blue.500" />
            4 points for making the top 15
          </ListItem>
          <ListItem>
            <ListIcon as={StarIcon} color="blue.500" />
            10th place gets an additional point, 9th place gets 2 additional points, and so on, with the winner getting 10 points for 1st place plus an additional 15 points
          </ListItem>
        </List>
      </Box>

      <Divider />

      {/* Low-Ranked Player Incentives */}
      <Box my={6}>
        <Heading as="h2" size="lg" mb={3}>
          Incentives for Choosing Low-Ranked Players
        </Heading>
        <List spacing={2}>
          <ListItem>
            <ListIcon as={StarIcon} color="orange.500" />
            If you pick someone ranked 10-20 and they make the top 25, you get an extra 6 points
          </ListItem>
          <ListItem>
            <ListIcon as={StarIcon} color="orange.500" />
            If you pick someone outside the top 20 and they make the top 25, you get an additional 11 points
          </ListItem>
        </List>
      </Box>

      <Divider />

      {/* Team Bonuses */}
      <Box mt={6}>
        <Heading as="h2" size="lg" mb={3}>
          Team Bonuses
        </Heading>
        <List spacing={2}>
          <ListItem>
            <ListIcon as={StarIcon} color="purple.500" />
            If any team has all 8 players make the cut, you get a bonus 15 points (this includes top 5 players)
          </ListItem>
          <ListItem>
            <ListIcon as={StarIcon} color="purple.500" />
            An extra 15 points goes to the worst-ranked player picked that makes it to the top 25
          </ListItem>
        </List>
      </Box>
    </Box>
  </VStack>
</Container>

    </Box>
  );
};

export default ScoringPage;
