from player import Player
class Team:
    def __init__(self, name:str, email, score=0.0):
        """
        Initialize the Entry with a name, score, and an empty roster of players.
        :param name: The name of the entry.
        :param score: The score (default is 0).
        """
        self.name = name  # Name of the team
        self.email = email
        self.score = score  # Default value is 0.0
        self.roster: list[Player]  = []  # List of Players on the team
        self.ALLCUT = False  # Boolean flag for if all players on the team made the cut
        self.WORST_IN_25 = False  # Boolean flag for if their team has the worst-ranked player to make the top 25

    def add_player(self, player):
        """
        Add a player to the roster
        """
        self.roster.append(player)
    
    def list_player(self):
        for p in self.roster:
            print(p)
    
    def calculate_score(self, worst_top_25):
        all_cut = True
        for p in self.roster:
            p.calculate_score(worst_top_25)
            self.score += p.get_score()
            all_cut = all_cut and p.get_made_cut()
            if p.name == worst_top_25:
                self.WORST_IN_25 = True
        
        if all_cut:
            self.score += 15    #15 bonus points for everyone on the team making the cut
            self.ALLCUT = True
        
        if self.WORST_IN_25:
            self.score += 15    #15 bonus points for having the lowest ranked selected player in the top 25
    
    def get_score(self):
        return self.score

    def get_name(self):
        return self.name
    
    def get_email(self):
        return self.email
    
    def get_worst_ranked(self):
        return self.WORST_IN_25

    def get_all_cut(self):
        return self.ALLCUT

    def get_roster(self):
        return self.roster

    def __str__(self):
        return f"Team:{self.name}\n"  + '\n'.join(str(player) for player in self.roster) + f'\nTotal: {self.score}\n'


