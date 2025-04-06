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
        

    

