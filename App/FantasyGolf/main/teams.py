class Team:
    def __init__(self, name:str, score=0.0):
        """
        Initialize the Entry with a name, score, and an empty roster of players.
        :param name: The name of the entry.
        :param score: The score (default is 0).
        """
        self.name = name  # Name of the team
        self.score = score  # Default value is 0.0
        self.roster = []  # List of Players on the team
        self.ALLCUT = False  # Boolean flag for if all players on the team made the cut
        self.WORST_IN_25 = False  # Boolean flag for if their team has the worst-ranked player to make the top 25

    def add_player(self, player_name:str):
        """
        Add a player to the roster
        :param player_name: full name of the player
        """
        self.roster.append(player_name)
    
    def list_player(self):
        for p in self.roster:
            print(p)
