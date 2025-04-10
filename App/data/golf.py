# Includes pythod functions to get live leaderboard of any given tournament, as well
# as current world rankings. Uploads results to text files

import requests
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv() 
API_KEY =  os.getenv("RAPID_API_KEY")

CURRENT_ROUND = 1

# 2024 season tournament ID's
# Masters 651
# PGA Championship 658
# US open 662
# Open championship: 701
def results():
    ## Uncoment all this to actually pull from the API

    #change number at end of string to get results for specific tournament
    url = "https://golf-leaderboard-data.p.rapidapi.com/leaderboard/748"
    headers = {
        'x-rapidapi-host': "golf-leaderboard-data.p.rapidapi.com",
        'x-rapidapi-key': API_KEY
        }

    response = requests.request("GET", url, headers=headers)

    # Find out what round is being played
    CURRENT_ROUND = response.json()['results']['tournament']['live_details']['current_round']

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

    print("Updated Rankings")

def get_player_list():
    url = "https://golf-leaderboard-data.p.rapidapi.com/entry-list/748"

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
#rankings()
#get_player_list()
print("Done")
