#Includes pythod functions to get live leaderboard of any given tournament, as well
#as current world rankings. Uploads results to text files

import requests
import pandas as pd
import csv 
import json
import SECRET
# 2024 season tournament ID's
# Masters 651
# PGA Championship 658
# US open 662
# Open championship: 701 
def results():
    #change number at end of string to get results for specific tournament 
    url = "https://golf-leaderboard-data.p.rapidapi.com/leaderboard/746"

    headers = {
        'x-rapidapi-host': "golf-leaderboard-data.p.rapidapi.com",
        'x-rapidapi-key': SECRET.API_KEY
        }

    response = requests.request("GET", url, headers=headers)

    leaderboard = response.json()['results']['leaderboard']
        
    l = []
    for players in leaderboard:
        last_name = players["last_name"]
        first_name = players["first_name"]
        if last_name == "Åberg":
            last_name = "Aberg"
        if last_name == "Fitzpatrick":
            first_name = "Matt"
        if last_name == "Smith" and first_name == "Cam":
            first_name = "Cameron"
        if last_name == "Højgaard":
            last_name = "Hojgaard"
        l.append([first_name, last_name, players['position'], players['status']])


    with open('leaderboard', 'w') as outfile:
        for item in l:
            outfile.write(item[0] + " " + item[1] + ": " +  str(item[2]) + ": " + item[3] + '\n')
    with open('listOfPlayers', 'w') as outfile:
        for item in l:
            outfile.write(item[0] + " " + item[1]+'\n')
    print("Updated Results")
    ## Change this to also return a dataframe 

def format_name(name):
    parts = name.split(", ")
    if len(parts) == 2:
        return f"{parts[1]} {parts[0]}"  # "First Last"
    return name  # Return as is if there's no comma
            

def rankings():
    rankings_df = pd.read_csv('resources/powerRankings.csv')
    rankings_df["player_name"] = rankings_df["player_name"].apply(format_name)
    rankings_df = rankings_df.rename(columns={"dg_rank": "rank"})
    return rankings_df


    print("Updated Rankings")

     
          
results()
#rankings() 
print("Done")