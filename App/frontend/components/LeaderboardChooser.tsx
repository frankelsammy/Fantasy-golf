'use client';
import React from 'react'
import { useBreakpointValue } from '@chakra-ui/react';

import LeaderboardTable from "@/components/Leaderboard";
import MobileLeaderboardTable from "@/components/MobileLeaderboard";
interface LeaderboardProps {
    initialData?: any;
}
const LeaderboardChooser = ({ initialData }: LeaderboardProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    console.log("You are using a " + (isMobile ? "mobile" : "desktop") + " device.");
  return (
    <div>
      {isMobile ? <MobileLeaderboardTable initialData={initialData} /> : <MobileLeaderboardTable initialData={initialData} />}
    </div>
  )
}

export default LeaderboardChooser
