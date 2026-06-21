import clientPromise from "../../../lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("FantasyGolf");

        const doc = await db
            .collection("League")
            .findOne({ title: "player_counts" });

        if (!doc) {
            return Response.json(
                { error: "Player counts not found" },
                { status: 404 }
            );
        }

        return Response.json(doc.player_counts);
    } catch (e) {
        console.error(e);

        return Response.json(
            { error: "Failed to fetch player counts" },
            { status: 500 }
        );
    }
}