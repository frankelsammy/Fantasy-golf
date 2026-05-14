from enum import Enum

class TOURNAMENT(Enum):
    MASTERS = 1
    US_OPEN = 2
    OPEN_CHAMPIONSHIP = 3
    PGA = 4

    def __str__(self):
        return self.name

class MODE(Enum):
    PROD = 1
    TESTING = 2

#Select which tournament is currently being run
current_tournament = TOURNAMENT.PGA

CURRENT_ROUND = 1

#Select mode
CURRENT_MODE = MODE.PROD

