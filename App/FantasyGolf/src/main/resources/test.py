import pandas as pd
from bs4 import BeautifulSoup

# Read the HTML file
dfs = pd.read_html('FantasyGolf/src/main/resources/si.html')
print(dfs)