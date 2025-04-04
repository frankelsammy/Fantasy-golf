# Utilities
import os
import sys
sys.path.append('../../data') 
import subprocess
import pandas as pd

from config import HOME_DIR, DATA_DIR
# Python Modules
from golf import rankings, results
from league import League
from teams import Team
from results import create_player_dict

def main():
    # retrieve the rankings 
    rankings_dict = rankings()          # dict of player_name -> ranking
    
    # Update the leaderboard
    results_df = results()              #Dataframe: Name, Position, Status

    # Calculate score for every player in the field, and create a dictionary of name to Player


    # competition = League()

    # teams = pd.read_csv("resources/teams.csv")
    # # Reading the teams.csv file to upload all the teams rosters
    # for index, row in teams.iterrows():
    #     team = Team(row['teamName'])
    #     team.add_player(row['p1'])
    #     team.add_player(row['p2'])
    #     team.add_player(row['p3'])
    #     team.add_player(row['p4'])
    #     team.add_player(row['p5'])
    #     team.add_player(row['p6'])
    #     team.add_player(row['p7'])
    #     team.add_player(row['p8'])
    #     competition.add_team(team)
    
    # print(len(competition.teams))


if __name__ == "__main__":
    main()
