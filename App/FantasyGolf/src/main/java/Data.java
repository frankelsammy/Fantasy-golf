import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;
import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Data {
    public static void main(String[] args) throws IOException, GeneralSecurityException {
        // Calls python script to update the leaderboard
        CallPython.updateLeaderboard();

        System.out.println("Remember to add commas to last player in every line");

        int numTeams = CSVLineCounter.numLinesCSV("App/FantasyGolf/src/main/resources/teams.csv");
        League league = new League();
        Results r = new Results();

        r.inputResultsAndRankings();

        // Reads the teams from the CSV
        // Make sure commas are added to end of every line
        Scanner sc = new Scanner(new File("App/FantasyGolf/src/main/resources/teams.csv"));
        sc.useDelimiter(",");

        List<List<String>> entries = new LinkedList<>();
        for (int teams = 0; teams < numTeams; teams++) {
            List<String> team = new LinkedList<>();
            for (int player = 0; player < 9; player++) {
                if (sc.hasNext())
                    team.add(sc.next());
            }
            entries.add(team);

        }
        sc.close();

        // Creates classes for players and teams
        for (List<String> entry : entries) {
            ArrayList<Player> roster = new ArrayList<>();

            int j = 1;
            for (int i = 0; i < 8; i++) {
                boolean first = false, second = false;
                if (i == 0)
                    first = true;
                if (i == 1)
                    second = true;

                Player p = new Player(entry.get(j++).toString().replaceAll(" ", ""), first, second);

                int ranking = r.getRanking(p.getName());

                p.setRanking(ranking);
                int finish = r.getResult(p.getName());
                boolean cut = r.madeCut(p.getName());
                p.inputResults(finish,
                        cut);
                roster.add(p);

            }

            Entry e = new Entry(entry.get(0), roster);
            league.addEntry(e);

        }

        league.score();

        league.makeJSONObject();

        CallPython.updateDatabase();
    }
}
