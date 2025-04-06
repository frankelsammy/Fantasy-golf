import json
from datetime import datetime

from teams import Team
class League:

    # Constructor to initialize the object
    def __init__(self):
        self.teams = [] 
        self.worst_player = None    # Lowest ranked selected player to make top 25
        self.list_of_players = []
        self.player_scores = {}  # Dictionary to map player names to their scores
    
    def add_team(self, team):
        self.teams.append(team)
    
    def list_teams(self):
        for team in self.teams:
            print(team.name)

    def calculate_score(self):
        for team in self.teams:
            team.calculate_score(self.worst_player)
    
    def sort_teams(self):
        self.teams = sorted(self.teams, lambda team: team.get_score)
    
    def set_worst_player_in_top_25(self, worst):
        self.worst_player = worst
    
    def JSONify(self):
        '''
        Creates the JSON object with the results of the league to be sent to database
        '''
        # Sort teams by score 
        self.teams = sorted(self.teams, key=lambda team:team.get_score())
        
        data = {}
        data["title"] = "leaderboard"
        
        now = datetime.now()
        formatted_date = now.strftime("%A, %B %d %-I:%M %p")
        data["Date"] = formatted_date

        data['worstTop25'] = self.worst_player
        
        teams_objects = []
        prev_score = -1
        place = 0
        for team in self.teams:
            team_obj = {}
            team_obj["Name"] = team.get_name()
            team_obj["Total Score"]  = team.get_score()
            team_obj["WorstRankedBonus"] = team.get_worst_ranked()
            if team.get_score() != prev_score:
                place += 1
            team_obj["Place"] = place
            prev_score = team.get_score()
            team_obj["AllCut"] = team.get_all_cut()
            teams_objects.append(team_obj)
            roster = []
            for player in team.get_roster():
                roster.append(player.JSONify())
            team_obj["Roster"] = roster
        
        data["Teams"] = teams_objects
        
        with open("resources/Results.json", "w") as f:
            json.dump(data, f, indent=4)
    

        

    

