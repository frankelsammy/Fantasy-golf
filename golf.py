import requests
import pandas as pd 
import json
# 2022 season tournament ID's
# Masters 456
# PGA Championship 393
# US Open 397
# The open 403


#change number at end of string to get results for specific tournament 
url = "https://golf-leaderboard-data.p.rapidapi.com/leaderboard/279"

headers = {
    'x-rapidapi-host': "golf-leaderboard-data.p.rapidapi.com",
    'x-rapidapi-key': "cd2f78eee0msh57d5ae1e1810fa2p1d0880jsn872939440f2c"
    }

response = requests.request("GET", url, headers=headers)

leaderboard = response.json()['results']['leaderboard']

leaders = [] 
place = []
for player in leaderboard:
    leaders.append(player['first_name'] + " " +  player['last_name'])
    place.append(player['position'])

df = pd.DataFrame(list(zip(leaders,place)))
df.columns = ["Name", "Position"]

def get_result(name):
    res = df.query(f"Name == @name")
    res = res.reset_index()
    if (not df.empty):
        return res.at[0, 'Position']
    else:
        return -1

my_file = open("test_file.txt", "w")

l = []
for players in leaderboard:
    l.append((players['last_name'], players['position']))

json_string = json.dumps(l)

with open('leaderboard.json', 'w') as outfile:
    outfile.write(json_string)
