import unittest
import os
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from main import config

class TestTournament(unittest.TestCase):
    def test_run_tournament(self):
        assert config.CURRENT_MODE == config.MODE.TESTING

if __name__ == "__main__":
    unittest.main()