# Fantasy Golf Competition
Welcome to the Fantasy Golf Competition! This project allows users to create teams by selecting golfers, with scores determined by their performance in real-life tournaments.

## Project Overview
The Fantasy Golf Competition is a web application where users can form fantasy teams consisting of real golfers. The scores of the teams are based on the golfers' actual performance in ongoing tournaments. The application provides real-time updates, leveraging APIs to fetch live scores and standings.

Check out the live application [here](https://golf-competition-193e590fabff.herokuapp.com/)

## Features
- Create and manage fantasy golf teams
- Real-time updates of scores based on golfers' tournament performance
- Leaderboards to track team standings
- Responsive and user-friendly interface

## Project Structure
- App/FantasyGolf
  - Java code for calculating the scores for the tournament
  - Reads the teams from a csv file and creates the league
  - Reads the leaderboard and caulculates scores
  - Main method found in Data.java
- App/Database
  - Code for interacting with the MongoDB database
- App/data
  - Python code for reading in the golf power rankings and gettin real-time updates in the leaderboard for golf tournaments
- App/FantasyGolfServer
  - Webserver for displaying the results on the webpage
  - Interacts with the database and updates every minute
  
## Technologies Used
### Backend
- Java and Python: Used for backend processing and API integrations to fetch real-time data.
- APIs: Used golf leaderboard data API on RAPIDAPI to get live updates during tournaments 
### Frontend
- Node.js and Express: For server-side scripting and handling API routes.
- HTML/CSS: For structuring and styling the web pages.
### Database
- MongoDB database
### Hosting
-Heroku: Used for deploying the application.
