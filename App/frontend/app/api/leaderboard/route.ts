import { getLeaderboardData } from "@/lib/getLeaderboardData";

export async function GET() {
  try {
    const leaderboard = await getLeaderboardData();
    return new Response(JSON.stringify(leaderboard), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
    });
  }
}