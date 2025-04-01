from config import HOME_DIR, DATA_DIR

def create_player_dict():
    '''
    Goes through every player in the field and creates a Player object for them,
    calculating their score based on their results
    '''
    with open(DATA_DIR + "/listOfPlayers", "r") as file:
        for line in file:
            name = line.strip()
            print(name)