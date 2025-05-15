import json
from datetime import datetime
from zoneinfo import ZoneInfo

from teams import Team
import config
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
        self.teams = sorted(self.teams, key=lambda team:team.get_score(), reverse=True)
        
        data = {}
        data["title"] = "leaderboard"
        
        now = datetime.now(ZoneInfo("America/New_York"))
        formatted_date = now.strftime("%A, %B %d %-I:%M %p")
        data["Date"] = formatted_date
        print(formatted_date)
        data["CURRENT_ROUND"] = config.CURRENT_ROUND

        data['worstTop25'] = self.worst_player
        
        teams_objects = []
        prev_score = -1
        place = 0
        numTies = 0
        for team in self.teams:
            team_obj = {}
            team_obj["Name"] = team.get_name()
            team_obj["Total Score"]  = team.get_score()
            team_obj["WorstRankedBonus"] = team.get_worst_ranked()
            if team.get_score() != prev_score:
                place += (1 + numTies)
                numTies = 0
            else:
                numTies += 1
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
    
    def make_overall_leaderboard(self):
        '''
        If this is the masters, the overall leaderboard needs to be created
        '''
        data = {}
        data["title"] = "overall"
        teams_objects = []
        prev_score = -1
        numTies = 0
        place = 0
        for team in self.teams:
            team_obj = {}
            team_obj["name"] = team.get_name()
            team_obj["email"] = team.get_email()
            masters = team.get_score()
            team_obj["masters"] = masters
            team_obj["US"] = 0
            team_obj["open"] = 0 
            team_obj["pga"] = 0
            team_obj["total"] = masters
            if masters != prev_score:
                place += (1 + numTies)
                numTies = 0
            else:
                numTies += 1
            team_obj["place"] = place
            teams_objects.append(team_obj)
            prev_score = masters
            
        data["Teams"] = teams_objects
        with open("resources/Overall.json", "w") as f:
            json.dump(data, f, indent=4)
    
    def update_overall(self, overall):
        '''
        Updates the overall leaderboard with current scores 
        '''
        #add the score from the current tournament to the overall leaderboard
        for team in overall["Teams"]:
            matching_team = None
            for comp_team in self.teams:
                if team.get("email") == comp_team.get_email():
                    matching_team = comp_team
                    break
            if matching_team == None:
                print(f"no matching team for email: {team.get('email')}")
                return
            total = 0
            if config.current_tournament == config.TOURNAMENT.PGA:
                team['pga'] = matching_team.get_score()
            total += team['pga']
            
            if config.current_tournament == config.TOURNAMENT.OPEN_CHAMPIONSHIP:
                team['open'] = matching_team.get_score()
            total += team['open']
            
            if config.current_tournament == config.TOURNAMENT.US_OPEN:
                team['US'] = matching_team.get_score()
            total += team['US']
            
            if config.current_tournament == config.TOURNAMENT.OPEN_CHAMPIONSHIP:
                team['master'] = matching_team.get_score()  
            total += team['masters']
            
            team["total"] = total


        #sort the team objects by total and calculate places 
        overall["Teams"].sort(key=lambda team: team["total"], reverse=True)
        prev_total = -1
        numTies = 0
        place = 0
        for team in overall["Teams"]:
            if team['total'] != prev_total:
                place += (1 + numTies)
                numTies = 0
            else:
                numTies += 1
            prev_total = team['total']
            team["place"] = place
        
        with open("resources/Overall.json", "w") as f:
                json.dump(overall, f, indent=4)
