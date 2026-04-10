'use client';
import React from 'react'
import { useBreakpointValue } from '@chakra-ui/react';

import TournamentLeaderboard from "@/components/TournamentLeaderboard";
interface LeaderboardProps {
    initialData?: any;
}
const LeaderboardChooser = ({ initialData }: LeaderboardProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    console.log("You are using a " + (isMobile ? "mobile" : "desktop") + " device.");
  return (
    <div>
      {isMobile ? <TournamentLeaderboard initialData={initialData} /> : <TournamentLeaderboard initialData={initialData} />}
    </div>
  )
}

export default LeaderboardChooser
