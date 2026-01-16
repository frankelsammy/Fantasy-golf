import React from 'react'
import Navbar from "@/components/navbar";
import OverallLeaderboard from '@/components/overallLeaderboard';
const Links = [
  { label: "Home", href: "/" },
  { label: "Scoring", href: "/scoring" },
  { label: "World Power Rankings", href: "https://datagolf.com/datagolf-rankings" },
];
const OverallPage = () => {
  return (
    <div>
        <Navbar Links={Links} />
        <OverallLeaderboard />
    </div>
  )
}

export default OverallPage
