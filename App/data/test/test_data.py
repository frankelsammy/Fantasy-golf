import unittest
import os
import requests
from dotenv import load_dotenv

load_dotenv()

class TestLiveGolfAPI(unittest.TestCase):
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

        print("✅ API call successful, leaderboard length:", len(data['leaderboardRows']))
if __name__ == '__main__':
    unittest.main()