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
    public static boolean resultsInFile = false;

    public static void main(String[] args) throws IOException, GeneralSecurityException {
        // Calls python script to update the leaderboard
        CallPython.updateLeaderboard();

        Scanner scanner = new Scanner(System.in);

        System.out.println("Remember to add commas to last player in every line");
        System.out.println("Do you want the results in a file? y/n");
        String ans = scanner.next();
        if (ans.equals("y")) {
            resultsInFile = true;
        }

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
        // Print final results
        league.score();

        // putting the results into a text file
        if (resultsInFile) {

            // This will need to be changed if working on a different computer
            String fileName = "/Users/sammyfrankel/FantasyGolf/Results";
            File f = new File(fileName);

            try {

                if (!f.createNewFile()) {
                    try {
                        f.delete();
                        f.createNewFile();

                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                FileWriter edit = new FileWriter(fileName, true);
                BufferedWriter bw = new BufferedWriter(edit);
                int team = 1;
                LocalDateTime currentDateTime = LocalDateTime.now();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE h:mm a");
                String formattedDateTime = currentDateTime.format(formatter);
                bw.write("Last updated: " + formattedDateTime + "\n");
                bw.write("\n");
                for (Entry e : league.getEntries()) {

                    bw.write(team++ + ": " + e.getName() + ":\n");
                    ArrayList<Player> roster = e.getEntry();
                    for (int i = 0; i < 8; i++) {
                        bw.write(i + 1 + "." + roster.get(i).getName() + " (Finish:" + roster.get(i).getFinish() + ")"
                                + ": " + roster.get(i).getPoints() + " pts \n");

                    }

                    // Printing of bonus points
                    // THESE WILL NEED TO BE UPDATED IF VALUES CHANGE
                    if (e.ALLCUT) {
                        bw.write("Bonus for all players making the cut: 15.0 pts\n");
                    }
                    if (e.WORST_IN_25) {
                        bw.write("Bonus for having the worst ranked player in top 25 " + "(" + league.worstPlayer
                                + "):  15.0 pts \n");
                    }
                    bw.write("TOTAL POINTS: " + e.getScore() + "\n\n");
                }
                bw.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        league.makeJSONObject();
        CallPython.updateDatabase();
    }
}
