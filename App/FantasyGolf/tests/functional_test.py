import unittest
import sys
import os
from pathlib import Path

# Get the main directory
main_dir = Path(__file__).parent.parent / 'main'

# Change to the main directory so relative paths work
os.chdir(main_dir)

# Add the main directory to the path so all imports work correctly
sys.path.insert(0, str(main_dir))

from main import run_tournament
import config


class TestRunTournament(unittest.TestCase):
    """Functional tests for the run_tournament function"""
    
    def test_run_tournament(self):
        """Test that run_tournament executes"""
        config.CURRENT_MODE = config.MODE.TESTING
        assert config.CURRENT_MODE == config.MODE.TESTING
        run_tournament()


if __name__ == '__main__':
    unittest.main()