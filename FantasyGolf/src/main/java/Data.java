import java.io.IOException;
import java.io.BufferedWriter;
import java.io.File;
import java.io.PrintWriter;
import java.io.FileWriter;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;
import java.io.*;

import javax.imageio.IIOException;


public class Data {
    
    // This is the ID of the google sheets page
   
    public static boolean resultsInFile = false;



    public static void main(String[] args) throws IOException, GeneralSecurityException {
        Scanner scanner = new Scanner(System.in);
        int cutPlace;

        if (args.length == 0) {
            System.out.println("Do you want the results in a file? y/n");
            String ans = scanner.next();
            if (ans.equals("y")) {
                resultsInFile = true;
            }
            System.out.println("What place was the cut made at (inclusive)?");
            cutPlace = scanner.nextInt();
        } else {
            String ans = args[0];
            cutPlace = Integer.parseInt(args[1]);
        }
        int numTeams = 0;
        System.out.println("How many teams in competition?");
        numTeams = scanner.nextInt();

        int teamsDone = 0;
        League league = new League(args);
        Results r = new Results();
        r.inputResultsAndRankings();


        //Reads the teams from the CSV
        //Make sure commas are added to end of every line
        Scanner sc = new Scanner(new File("FantasyGolf/src/main/resources/teams.csv"));
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
        
        //Creates classes for players and teams
        for (List entry : entries) {
            ArrayList<Player> roster = new ArrayList<Player>();

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
                p.inputResults(finish,
                            (finish <= cutPlace));
                roster.add(p);

            }
            
            Entry e = new Entry(entry.get(0).toString(), roster);
            league.addEntry(e);

        }
        // Print final results
        league.score();

        // putting the results into a text file
        if (resultsInFile) {
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
                for (Entry e : league.getEntries()) {
                    
                    bw.write(team++ + ": " + e.getName() + ":\n");
                    ArrayList<Player> roster = e.getEntry();
                    for (int i = 0; i < 8; i++) {
                        bw.write(i + 1 + "." + roster.get(i).getName() + " (Finish:" + roster.get(i).getFinish() + ")"
                                + ": " + roster.get(i).getPoints() + " pts \n");

                    }
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

    }

}
