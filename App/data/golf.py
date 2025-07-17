# Includes pythod functions to get live leaderboard of any given tournament, as well
# as current world rankings. Uploads results to text files

import requests
import pandas as pd
import os
import sys
from dotenv import load_dotenv
import random

import config

# import config
load_dotenv() 
API_KEY =  os.getenv("API_KEY")


# 2024 season tournament ID's
# Masters 651
# PGA Championship 658
# US open 662
# Open championship: 701:

def results():
    ## Uncoment all this to actually pull from the API

    #change number at end of string to get results for specific tournament
    url = "https://live-golf-data.p.rapidapi.com/leaderboard"

    querystring = {"orgId":"1","tournId":"100","year":"2025"}

    headers = {
        "x-rapidapi-key": "cd2f78eee0msh57d5ae1e1810fa2p1d0880jsn872939440f2c",
        "x-rapidapi-host": "live-golf-data.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)
    #print(response.json().keys())
    leaderboard = response.json()['leaderboardRows']

    # Find out what round is being played
    config.CURRENT_ROUND = int(response.json()['roundId']['$numberInt'])
    print(config.CURRENT_ROUND)


    l = []
    for players in leaderboard:
        last_name = players["lastName"]
        first_name = players["firstName"]
        position = 1000
        #Philip Barbaree, Jr.
        if last_name == "Åberg":
            last_name = "Aberg"
        if last_name == "Fitzpatrick":
            first_name = "Matt"
        if last_name == "Smith" and first_name == "Cam":
            first_name = "Cameron"
        if last_name == "Højgaard":
            last_name = "Hojgaard"
        if first_name == 'Joaquín':
            first_name = 'Joaquin'
        if first_name == 'J. T.':
            first_name = 'J.T.'
        if last_name == 'Barbaree, Jr.':
            last_name = 'Barbaree'

        if players['position'] == '-':
            position = 1001
        elif players['position'].lower()[0] == 't':
            position = int(players['position'][1:])
        elif players['position'] == "CUT" or players['position'] == "WD":
            position = 1000
        else:
            position = int(players['position'])
        # If you want to simulate results
        # position = random.randint(1, 157)
        l.append([first_name, last_name, position, players['status']])
    
    with open("../../data/leaderboard.csv", "w") as outfile:
        outfile.write("Name,Position,Status\n")

    with open("../../data/leaderboard.csv", "a") as outfile:
        for item in l:
            outfile.write(
                item[0] + " " + item[1] +  "," + str(item[2]) + "," + item[3] + "\n"
            )
        
    df = pd.read_csv("../../data/leaderboard.csv")
    return df


def format_name(name):
    parts = name.split(", ")
    if len(parts) == 2:
        return f"{parts[1]} {parts[0]}"  # "First Last"
    return name  # Return as is if there's no comma

#return a dictionary of name to ranking
def rankings():
    rankings_df = pd.read_csv("resources/powerRankings.csv")
    rankings_df["player_name"] = rankings_df["player_name"].apply(format_name)
    rankings_df = rankings_df.rename(columns={"dg_rank": "rank"})
    return rankings_df.set_index("player_name")["rank"].to_dict()

def get_player_list():
    url = "https://golf-leaderboard-data.p.rapidapi.com/entry-list/759"

    headers = {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "golf-leaderboard-data.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers).json()
    data = response["results"]["entry_list"]
    i = 0
    with open("../../data/listOfPlayers", "w") as outfile:
        for player in data:
            last_name = player['last_name']
            if last_name == "Åberg":
                last_name = "Aberg"
            if last_name == "Fitzpatrick":
                first_name = "Matt"
            if last_name == "Smith" and first_name == "Cam":
                first_name = "Cameron"
            if last_name == "Højgaard":
                last_name = "Hojgaard"
            outfile.write(f"{player['first_name']} {last_name}\n")
            

#results()
# rankings()
# #get_player_list()
rankings()
#get_player_list()
print("Done")
