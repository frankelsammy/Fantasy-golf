import clientPromise from "../../../lib/mongodb";
let cachedLeaderboard: any = null;
let lastFetched = 0;
const CACHE_TTL = 60000;
export async function GET() {
  try {
    const now = Date.now();

    const client = await clientPromise;
    const db = client.db("FantasyGolf");
    if (cachedLeaderboard && now - lastFetched < CACHE_TTL) {
      console.log("Serving leaderboard from cache");
      return new Response(JSON.stringify(cachedLeaderboard), {
        
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }
    const leaderboard = await db.collection("League").findOne({ title: "leaderboard" });

    cachedLeaderboard = leaderboard;
    lastFetched = now;

    return new Response(JSON.stringify(leaderboard), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
