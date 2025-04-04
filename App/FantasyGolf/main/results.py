from player import Player

def create_player_dict(results_df, rankings):
    '''
    Goes through every player in the field and creates a Player object for them,
    calculating their score based on their results
    '''
    for index, row in results_df.iterrows():
       name = row["player_name"]
       rank = rankings.get(name, 1000)
       