#Includes pythod functions to get live leaderboard of any given tournament, as well
#as current world rankings. Uploads results to text files

import requests
import pandas as pd 
import json
# 2023 season tournament ID's
# Masters 501
# PGA Championship 507
# US Open 511
# The open 518

def results():
    #change number at end of string to get results for specific tournament 
    url = "https://golf-leaderboard-data.p.rapidapi.com/leaderboard/501"

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


    with open('leaderboard.txt', 'w') as outfile:
        for item in l:
            outfile.write(item[0] + ": " +  str(item[1]) + '\n')

def rankings():
    url = "https://golf-leaderboard-data.p.rapidapi.com/world-rankings"
    
    headers = {
	"X-RapidAPI-Host": "golf-leaderboard-data.p.rapidapi.com",
	"X-RapidAPI-Key": "cd2f78eee0msh57d5ae1e1810fa2p1d0880jsn872939440f2c"
    }
    
    response = requests.request("GET", url, headers=headers)
    
    rankings = response.json()['results']['rankings']
    
    l = []
    i = 1
    for player in rankings:
        last_name = player['player_name'].split(" ")[1]
        l.append((player['position'], last_name))
        if i == 200:
            break;
        i = i + 1
    
    with open('rankings.txt', 'w') as outfile:
        for row in l:
            outfile.write(str(row[0]) + ": " + row[1] + '\n')
     
          
results() 
rankings()
print("Done")