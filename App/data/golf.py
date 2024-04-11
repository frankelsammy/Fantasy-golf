#Includes pythod functions to get live leaderboard of any given tournament, as well
#as current world rankings. Uploads results to text files

import requests
import pandas as pd
import csv 
import json
import SECRET
# 2023 season tournament ID's
# Masters 501
# PGA Championship 507
# US Open 511
# The open 518

def results():
    #change number at end of string to get results for specific tournament 
    url = "https://golf-leaderboard-data.p.rapidapi.com/leaderboard/511"

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

    l = []
    for players in leaderboard:
        if players['last_name'] == "Kim":
            name = players["first_name"][0] + "." + players["last_name"]
        else:
            name = players["last_name"]
        
        l.append([name, players['position'], players['status']])


    with open('/Users/sammyfrankel/FantasyGolf/App/data/leaderboard', 'w') as outfile:
        for item in l:
            outfile.write(item[0] + ": " +  str(item[1]) + ": " + item[2] + '\n')

def rankings():
    # Open the CSV file in read mode
    with open('/Users/sammyfrankel/FantasyGolf/App/FantasyGolf/src/main/resources/powerRankings.csv', newline='') as csvfile:
        # Create a CSV reader object
        reader = csv.reader(csvfile)
        # Loop through each row in the CSV file
        i = 0
        rankings = []
        for row in reader:
            if (i > 0):
                name = row[0].split(",")
                if name[0] == 'Kim':
                    name = name[1][1] + "." + name[0]
                else:
                    name = name[0]
                rankings.append(name)
            i = i+1    
        
        with open('rankings', 'w') as outfile:
            place = 1
            for player in rankings:
                outfile.write(f"{place}" + ": " + player + "\n")
                place = place + 1

     
          
results()
#rankings() 