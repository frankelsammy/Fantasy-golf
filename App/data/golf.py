#Includes pythod functions to get live leaderboard of any given tournament, as well
#as current world rankings. Uploads results to text files

import requests
import pandas as pd 
import json
import SECRET
# 2023 season tournament ID's
# Masters 501
# PGA Championship 507
# US Open 511
# The open 518

def results():
    #change number at end of string to get results for specific tournament 
    url = "https://golf-leaderboard-data.p.rapidapi.com/leaderboard/518"

    headers = {
        'x-rapidapi-host': "golf-leaderboard-data.p.rapidapi.com",
        'x-rapidapi-key': SECRET.API_KEY
        }

    response = requests.request("GET", url, headers=headers)

    leaderboard = response.json()['results']['leaderboard']

    leaders = [] 
    place = []
    status = []
    for player in leaderboard:
        leaders.append(player['first_name'] + " " +  player['last_name'])
        place.append(player['position'])
        status.append(player['status'])

    df = pd.DataFrame(list(zip(leaders,place)))
    df.columns = ["Name", "Position"]

    def get_result(name):
        res = df.query(f"Name == @name")
        res = res.reset_index()
        if (not df.empty):
            return res.at[0, 'Position']
        else:
            return -1


    l = []
    for players in leaderboard:
        l.append([players['last_name'], players['position'], players['status']])


    with open('/Users/sammyfrankel/FantasyGolf/App/data/leaderboard', 'w') as outfile:
        for item in l:
            outfile.write(item[0] + ": " +  str(item[1]) + ": " + item[2] + '\n')

def rankings():
    url = "App/FantasyGolf/src/main/resources/si.html"

    data = pd.read_html(url)
    rankings = data[0]

    l = []
    for index, row in rankings.iterrows():
        last_name = row['Name'].split(" ")[1]
        rank = row['SI Rank'].split(" ")[0]
        l.append((rank, last_name))

    with open('App/data/rankings', 'w') as outfile:
            for row in l:
                outfile.write(str(row[0]) + ": " + row[1] + '\n')

     
          
results() 
#rankings()
print("Done")