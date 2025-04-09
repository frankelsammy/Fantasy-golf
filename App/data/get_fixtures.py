import requests
import SECRET

url = "https://golf-leaderboard-data.p.rapidapi.com/fixtures/2/2025"

headers = {
    'x-rapidapi-host': "golf-leaderboard-data.p.rapidapi.com",
    'x-rapidapi-key': SECRET.API_KEY
    }

response = requests.request("GET", url, headers=headers)
response = response.json()

fixtures = response['results']

my_file = open("fixtures.txt", "w")

with open('fixtures.txt', 'w') as outfile:
    for f in fixtures:
        outfile.write(f['name'] + ': ' +  str(f['id']) + '\n')
    