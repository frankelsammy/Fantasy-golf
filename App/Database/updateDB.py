from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import SECRET

user = SECRET.DB_USER
password = SECRET.DB_PASSWORD

cluster = MongoClient(f"mongodb+srv://{user}:{password}@cluster0.zbfrr36.mongodb.net/?retryWrites=true&w=majority")
db = cluster["FantasyGolf"]
collection = db["League"]

post = {"name": "Sammy",
        "Players": [{"name":"Scottie Scheffler", "Score": 50},
                    {"name":"Tiger Woods", "Score": 150}], 
        "Score": 200}

collection.insert_one(post)