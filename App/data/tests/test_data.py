import sys
import unittest
import os
import requests
from dotenv import load_dotenv
from pathlib import Path

# Get the main directory
main_dir = Path(__file__).parent.parent.parent / 'FantasyGolf' / 'main'

# Change to the main directory so relative paths work
os.chdir(main_dir)
# Add the main directory to the path so all imports work correctly
sys.path.insert(0, str(main_dir))
sys.path.append('../../data') 
from golf import rankings, results

load_dotenv()
import config
class TestData(unittest.TestCase):
    def test_real_api_call(self):
        API_KEY = os.getenv("API_KEY")
        self.assertIsNotNone(API_KEY, "API_KEY is not set in environment")

        url = "https://live-golf-data.p.rapidapi.com/leaderboard"
        querystring = {"orgId": "1", "tournId": "100", "year": "2025"}
        headers = {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": "live-golf-data.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)
        
        # Basic checks
        self.assertEqual(response.status_code, 200, f"API returned status code {response.status_code}")
        data = response.json()
        self.assertIn('leaderboardRows', data, "Missing 'leaderboardRows' in response")

        print("API call successful, leaderboard length:", len(data['leaderboardRows']))
    
    def test_rankings(self):
        config.CURRENT_MODE = config.MODE.TESTING
        assert config.CURRENT_MODE == config.MODE.TESTING
        rankings_df = rankings()
        assert rankings_df is not None, "Rankings function returned None"
        assert(rankings_df['Scottie Scheffler'] == 1), f"Scottie Scheffler should be ranked 1 in test data, but got {rankings_df['Scottie Scheffler']}"
        assert(rankings_df['Sam Burns'] == 35), f"Sam Burns should be ranked 35 in test data, but got {rankings_df['Sam Burns']}"
    
    def test_results(self):
        config.CURRENT_MODE = config.MODE.TESTING
        assert config.CURRENT_MODE == config.MODE.TESTING
        results_df = results()
        assert results_df is not None, "Results function returned None"
        assert config.CURRENT_ROUND == 4, f"Expected CURRENT_ROUND to be 4 in test mode, but got {config.CURRENT_ROUND}"
        assert 'Rory McIlroy' in results_df['Name'].values, "Rory McIlroy should be in test results"
        player_row = results_df[results_df['Name'] == 'Rory McIlroy'].iloc[0]
        position = player_row['Position']
        assert position == 1, f"Rory McIlroy should be in position 1 in test results, but got {position}"
        status = player_row['Status']
        assert status == 'complete', f"Rory McIlroy should have status 'complete', but got {status}"
        player_row = results_df[results_df['Name'] == 'Dustin Johnson'].iloc[0]
        position = player_row['Position']
        assert position == 1000, f"Dustin Johnson should be in position 1000 in test results, but got {position}"
        status = player_row['Status']
        assert status == 'cut', f"Dustin Johnson should have status 'cut', but got {status}"
        player_row = results_df[results_df['Name'] == 'Bob Johnson']
        assert player_row.empty, "Bob Johnson should not be in test results"
        
if __name__ == '__main__':
    unittest.main()