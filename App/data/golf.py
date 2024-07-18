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
    url = "https://golf-leaderboard-data.p.rapidapi.com/leaderboard/701"

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
        l.append([first_name, last_name, players['position'], players['status']])


    with open('/Users/sammyfrankel/FantasyGolf/App/data/leaderboard', 'w') as outfile:
        for item in l:
            outfile.write(item[0] + " " + item[1] + ": " +  str(item[2]) + ": " + item[3] + '\n')
    with open('/Users/sammyfrankel/FantasyGolf/App/data/listOfPlayers', 'w') as outfile:
        for item in l:
            outfile.write(item[0] + " " + item[1]+'\n')
    print("Updated Results")
            

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
                name = name[1] + " " + name[0] 
                rankings.append(name)
            i = i+1    
        
        with open('rankings', 'w') as outfile:
            place = 1
            for player in rankings:
                outfile.write(f"{place}" + ":" + player + "\n")
                place = place + 1
    print("Updated Rankings")

     
          
results()
#rankings() 