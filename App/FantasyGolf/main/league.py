from teams import Team
class League:

    # Constructor to initialize the object
    def __init__(self):
        self.teams = [] 
        self.worst_player = None
        self.list_of_players = []
        self.player_scores = {}  # Dictionary to map player names to their scores
    
    def add_team(self, team):
        self.teams.append(team)
    
    def list_teams(self):
        for team in self.teams:
            print(team.name)

    

