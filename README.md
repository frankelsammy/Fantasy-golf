# Fantasy Golf Competition
Full-stack fantasy golf platform for the Majors, built with a Python scoring engine and Next.js frontend. Each team drafts a set roster of players, earning points based on tournament finishes — with bonuses for top picks, full-cut rosters, and players who significantly outperform their projections. Standings update automatically as the tournament progresses.

Check out the live application [here](https://fantasy-golf-neon.vercel.app)

## Features
- Create and manage fantasy golf teams
- Real-time score updates based on golfers' tournament performance
- Leaderboards to track team standings
- Responsive and user-friendly interface

## Project Structure
- App/FantasyGolf
  - Core competition logic
  - Reads teams from a configuration file and creates the league
  - Reads the leaderboard and calculates scores
  - Entry point: main.py
- App/Database
  - MongoDB interaction layer
  - Reads the current overall leaderboard
  - Uploads results for the current Major
- App/data
  - Fetches golf power rankings and real-time leaderboard updates
- App/frontend
  - Next.js (React) frontend deployed on Vercel
  - Chakra UI component library
  - Displays live standings, team scores, and leaderboards
  - Queries the database and reflects the latest scoring results

## Technologies Used
### Backend
- Python: Core scoring engine and competition logic
- RapidAPI: Golf leaderboard data for live tournament updates

### Frontend
- Next.js: Frontend framework for displaying results and standings
- Vercel: Frontend deployment and hosting

### Database
- MongoDB
