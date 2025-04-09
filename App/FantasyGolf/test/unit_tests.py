import unittest
import sys
import subprocess
import os

sys.path.append('../main')
from player import Player
from main import run_tournament

class TestCalculateScore(unittest.TestCase):
    def testingScores(self):
        #Player(name, ranking, first, second, finish, status, worst_top_25)
        # First choice 
        p = Player("Scottie Scheffler", 1, True, False, 1, "complete", False)
        p.calculate_score(None)
        self.assertEqual(p.get_score(), 64)
        
        # Second choice 
        p = Player("Scottie Scheffler", 1, False, True, 1, "complete", False)
        p.calculate_score(None)
        self.assertEqual(p.get_score(), 48)

        #lowest in top 25
        p = Player("Scottie Scheffler", 1, False, False, 1, "complete", False)
        p.calculate_score("Scottie Scheffler")
        self.assertEqual(p.get_score(), 32)

        #Just made cut 
        p = Player("Tiger Woods", 90, False, False, 48, "Complete", False)
        p.calculate_score(None)
        self.assertEqual(p.get_score(), 5)

        #Low ranked player 
        p = Player("Tiger Woods", 90, False, False, 9, "Complete", False)
        p.calculate_score(None)
        self.assertEqual(p.get_score(), 25)

class Competition(unittest.TestCase):
    def testingProgram(self):
        self.assertEqual(1,1)



if __name__ == "__main__":
    unittest.main()