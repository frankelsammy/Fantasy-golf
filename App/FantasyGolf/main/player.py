class Player:
    
    def __init__(self, name, ranking, first, second, finish, made_cut, worst_top_25):
        self.name = name
        self.ranking = ranking
        self.first = first
        self.second = second
        self.finish = finish 
        self.made_cut = made_cut
        self.score = 0.0
        self.worst_top_25 = worst_top_25

    def score(self):
        '''
        Calculates the total points this player got (not included bonus for first/second pick)
        '''
        # points for making the cut if ranked > 5
        if self.made_cut and self.ranking >= 5:
            self.score += 5

        #top 25
        if self.finish <= 25:
            self.score += 3
            if self.ranking <= 20 and self.ranking > 10:
                self.score += 6
            if self.ranking > 20:
                self.score += 11
        
        #top 15
        if self.finish <= 15:
            self.score += 4
        
        #top 10
        if self.finish <= 10:
            self.score += (11 - self.finish)

        if self.worst_top_25:
            self.score += 15
        
        if self.first:
            self.score = self.score*2
        
        if self.second:
            self.score = self.score * 1.5
    
    def __str__(self):
        return f"Player {self.name} is in position {self.finish} with a score of {self.score}"
        
        


