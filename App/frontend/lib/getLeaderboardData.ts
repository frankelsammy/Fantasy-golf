import clientPromise from "./mongodb";

let cachedLeaderboard: any = null;
let lastFetched = 0;
const CACHE_TTL = 60000;

export async function getLeaderboardData() {
  const now = Date.now();

  // Return cache if it's still fresh
  if (cachedLeaderboard && now - lastFetched < CACHE_TTL) {
    console.log("Serving leaderboard from cache");
    return cachedLeaderboard;
  }

  const client = await clientPromise;
  const db = client.db("FantasyGolf");
  const leaderboard = await db.collection("League").findOne({ title: "leaderboard" });

  cachedLeaderboard = JSON.parse(JSON.stringify(leaderboard));
  lastFetched = now;

  return JSON.parse(JSON.stringify(leaderboard));;
}