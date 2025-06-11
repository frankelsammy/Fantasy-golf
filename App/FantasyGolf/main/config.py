from enum import Enum

class TOURNAMENT(Enum):
    MASTERS = 1
    US_OPEN = 2
    OPEN_CHAMPIONSHIP = 3
    PGA = 4

#Select which tournament is currently being run
current_tournament = TOURNAMENT.US_OPEN

CURRENT_ROUND = 1