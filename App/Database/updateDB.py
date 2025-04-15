from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

import json
import os
from dotenv import load_dotenv

load_dotenv() 
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
def upload_to_db():
    cluster = MongoClient(f"mongodb+srv://{user}:{password}@cluster0.zbfrr36.mongodb.net/?retryWrites=true&w=majority")
    db = cluster["FantasyGolf"]
    collection = db["League"]

    # Load JSON data from file
    results_file_path = 'resources/Results.json' 
    overall_file_path = 'resources/Overall.json'

    with open(results_file_path, 'r') as file:
        results = json.load(file)
    
    with open(overall_file_path, 'r') as file:
        overall = json.load(file)
    
        
    # Remove the old leaderboard
    # Remove the object with title "leaderboard"
    result = collection.delete_many({})


    # Insert new JSON data into MongoDB
    result = collection.insert_many([results, overall])


    # Check the result
    if result.inserted_ids:
        print(f"Data inserted successfully with document ID: {result.inserted_ids}")
    else:
        print("Failed to insert data into MongoDB")

def retrieve_overall():
    cluster = MongoClient(f"mongodb+srv://{user}:{password}@cluster0.zbfrr36.mongodb.net/?retryWrites=true&w=majority")
    db = cluster["FantasyGolf"]
    collection = db["League"]
    document = collection.find_one({"title": "overall"})
    #remove the id
    document.pop('_id', None)
    
    return document