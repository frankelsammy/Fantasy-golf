import http.client
import json
import os
from dotenv import load_dotenv

load_dotenv()

conn = http.client.HTTPSConnection("live-golf-data.p.rapidapi.com")

headers = {
    'x-rapidapi-key': os.getenv('RAPIDAPI_KEY'),
    'x-rapidapi-host': "live-golf-data.p.rapidapi.com",
    'Content-Type': "application/json"
}

conn.request("GET", "/tournament?orgId=1&tournId=026&year=2026", headers=headers)

res = conn.getresponse()
data = res.read()
raw = data.decode("utf-8")

print("Raw response received.")

tournament = json.loads(raw)

players = tournament.get("players", [])

with open("players.txt", "w") as f:
    for i, player in enumerate(players, start=1):
        first = player.get("firstName", "")
        last = player.get("lastName", "")
        f.write(f"{first} {last}\n")

print(f"Done! {len(players)} players written to players.txt")