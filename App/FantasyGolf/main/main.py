# Utilities
import os
import sys
sys.path.append('../../data') 
sys.path.append('../../Database') 
import subprocess
import pandas as pd

from config import HOME_DIR, DATA_DIR
# Python Modules
from golf import rankings, results, CURRENT_ROUND
from league import League
from teams import Team
from player import Player
from updateDB import upload

def run_tournament():
    # retrieve the rankings 
    rankings_dict = rankings()          # dict of player_name -> ranking
    
    # Update the leaderboard
    results_df = results()              #Dataframe: Name, Position, Status

    competition = League(CURRENT_ROUND)

    teams = pd.read_csv("resources/teams.csv")
    print(CURRENT_ROUND)
    selected_players_in_top_25 = []
    # Reading the teams.csv file to upload all the teams rosters
    for index, row in teams.iterrows():
        team = Team(row['teamName'])
        for i in range(1,9):
            player_name = row[f'p{i}']
            rank = rankings_dict.get(player_name, 1000)
            if player_name in results_df['Name'].values:
                player_row = results_df[results_df['Name'] == player_name].iloc[0]
                position = player_row['Position']
                status = player_row['Status']
                worst_player_top_25 = False
                player = Player(player_name, rank, i == 1, i == 2, position, status, worst_player_top_25, CURRENT_ROUND)
                team.add_player(player)
                if position <= 25:
                    selected_players_in_top_25.append(player_name)
            else:
                print(f"{player_name} not in results")
        competition.add_team(team)
    
    # Sort selected_players by ranking
    selected_players_in_top_25 = sorted(selected_players_in_top_25, key=lambda name:rankings_dict.get(name, 1000), reverse=True)

    worst_player_top_25 = selected_players_in_top_25[0]
    competition.set_worst_player_in_top_25(worst_player_top_25)
    competition.calculate_score()
    competition.JSONify()

    #Upload results to Database
    upload()
    

if __name__ == "__main__":
    run_tournament()
