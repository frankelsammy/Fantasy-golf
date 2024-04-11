from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import SECRET
import json
user = SECRET.DB_USER
password = SECRET.DB_PASSWORD

cluster = MongoClient(f"mongodb+srv://{user}:{password}@cluster0.zbfrr36.mongodb.net/?retryWrites=true&w=majority")
db = cluster["FantasyGolf"]
collection = db["League"]

# Load JSON data from file
json_file_path = 'App/Database/Results.json'  # Replace with the path to your JSON file
with open(json_file_path, 'r') as file:
    json_data = json.load(file)
    
# Remove the old leaderboard
result = collection.delete_one({"title": "leaderboard"})

# Insert new JSON data into MongoDB
result = collection.insert_one(json_data)


# Check the result
if result.inserted_id:
    print(f"Data inserted successfully with document ID: {result.inserted_id}")
else:
    print("Failed to insert data into MongoDB")

