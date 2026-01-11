'use client';
import { Box, Flex, HStack, Link, IconButton, useDisclosure, Stack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import LeaderboardTable from "@/components/leaderboard";
import Navbar from "@/components/navbar";

const Links = ["Home", "Overall Leaderboard", "Scoring"];

const page = () => {
  return (
    <div>
      <Navbar />
      <img src='/open.png' alt='Open' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '30%', paddingTop: '20px' }} />
      <LeaderboardTable />
    </div>
  )
}

export default page
