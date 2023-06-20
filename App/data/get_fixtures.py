import requests
import json

url = "https://golf-leaderboard-data.p.rapidapi.com/fixtures/2/2022"

headers = {
    'x-rapidapi-host': "golf-leaderboard-data.p.rapidapi.com",
    'x-rapidapi-key': "cd2f78eee0msh57d5ae1e1810fa2p1d0880jsn872939440f2c"
    }

response = requests.request("GET", url, headers=headers)
response = response.json()

fixtures = response['results']

my_file = open("fixtures.txt", "w")

with open('fixtures.txt', 'w') as outfile:
    for f in fixtures:
        outfile.write(f['name'] + ': ' +  str(f['id']) + '\n')
    