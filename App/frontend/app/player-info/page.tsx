import PlayerCounts from "@/components/playerCounts";
import Navbar from "@/components/navbar";
export default function Page() {
    return (
        <>
            <Navbar Links={[
                { label: "Home", href: "/" },
                { label: "Overall Leaderboard", href: "/overall" },
                { label: "Scoring", href: "/scoring" },
                { label: "World Power Rankings", href: "https://datagolf.com/datagolf-rankings" },
            ]} />
            <PlayerCounts />
        </>
    );
}