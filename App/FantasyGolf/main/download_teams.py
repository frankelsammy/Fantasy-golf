import os

import requests
import csv
import ast
from dotenv import load_dotenv

load_dotenv()
API_KEY =  os.getenv("JOTFORM_API_KEY")
FORM_ID = "241235583005045"

FIELD_MAP = {
    "player1": "p1",
    "player2": "p2",
    "player3": "p3",
    "player67": "p4",
    "player89": "p5",
    "player415": "p6",
    "player516": "p7",
    "player517": "p8",
    "email": "Email"
}

def get_submissions():
    url = f"https://api.jotform.com/form/{FORM_ID}/submissions"

    params = {
        "apiKey": API_KEY,
        "limit": 1000,
        "filter": '{"status":"ACTIVE"}'
    }

    response = requests.get(url, params=params)
    data = response.json()

    if data["responseCode"] != 200:
        print("Error:", data["message"])
        return

    submissions = data["content"]

    if not submissions:
        print("No submissions found")
        return

    rows = []
    for sub in submissions:
        answers = sub["answers"]

        name_raw = answers.get("3", {}).get("answer", {})
        if isinstance(name_raw, str):
            try:
                name_raw = ast.literal_eval(name_raw)
            except:
                name_raw = {}
        name = f"{name_raw.get('first', '')} {name_raw.get('last', '')}".strip()

        row = {"teamName": name, "Email": ""}

        for key, answer in answers.items():
            field_name = answer.get("name")
            res = answer.get("answer", "")
            if field_name != "email" and field_name in FIELD_MAP:
                player_name = answer.get("answer", "").split(" ")
                first_name = player_name[0]
                last_name = " ".join(player_name[1:])   
                if last_name == "Åberg":
                    last_name = "Aberg"
                if last_name == "Fitzpatrick":
                    first_name = "Matt"
                if last_name == "Smith" and first_name == "Cam":
                    first_name = "Cameron"
                if last_name == "Højgaard":
                    last_name = "Hojgaard"
                if first_name == 'Joaquín':
                    first_name = 'Joaquin'
                if first_name == 'J. T.':
                    first_name = 'J.T.'
                if last_name == 'Barbaree, Jr.':
                    last_name = 'Barbaree'
                if last_name == "García":
                    last_name = "Garcia"
                res = first_name + " " + last_name
                
            if field_name in FIELD_MAP:
                row[FIELD_MAP[field_name]] = res
                

        rows.append(row)

    fieldnames = ["teamName", "Email", "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"]
    with open(os.path.join(os.path.dirname(__file__), "resources", "teams.csv"), "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore", quoting=csv.QUOTE_ALL)
        f.write(",".join(fieldnames) + "\n")  # unquoted header
        writer.writerows(rows)

    print(f"Saved {len(rows)} submissions to teams.csv")

def get_emails():
    with open(os.path.join(os.path.dirname(__file__), "resources", "teams.csv"), "r") as f:
        reader = csv.DictReader(f)
        emails = [row["Email"] for row in reader if row["Email"]]
    return emails

if __name__ == "__main__":
    print(len(get_emails()))