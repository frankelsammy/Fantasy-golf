'use client';
import { Box, Divider, Flex, HStack, Link, IconButton, useDisclosure, Stack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import LeaderboardTable from "@/components/leaderboard";
import Navbar from "@/components/navbar";

<Divider />
const Links = [
  { label: "Home", href: "/" },
  { label: "Overall Leaderboard", href: "/overall" },
  { label: "Scoring", href: "/scoring" },
  { label: "World Power Rankings", href : "https://datagolf.com/datagolf-rankings" },
];

const page = () => {
  return (
    <div>
      <Navbar Links={Links} />
      <img src='/open.png' alt='Open' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '30%', paddingTop: '20px' }} />
      <Divider mt={4} borderColor="gray.700" borderWidth="1px"/>
      <LeaderboardTable />
    </div>
  )
}

export default page
