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
import java.util.concurrent.TimeUnit;
import java.io.*;

import javax.imageio.IIOException;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.Value;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.UpdateValuesResponse;
import com.google.api.services.sheets.v4.model.ValueRange;

public class Data {
    public static Sheets sheetsService;
    private static String APPLICATION_NAME = "sheets example";

    // This is the ID of the google sheets page
    private static String SPREADSHEET_ID = "1Zr0aXoVahHXpgi7EHsToW1a3hccXEDjnkWFRahN_3Vw";
    public static boolean resultsInFile = false;

    public static Credential authorize() throws IOException, GeneralSecurityException {
        InputStream in = Data.class.getResourceAsStream("/credentials.json");
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JacksonFactory.getDefaultInstance(),
                new InputStreamReader(in));
        List<String> scopes = Arrays.asList(SheetsScopes.SPREADSHEETS);
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                GoogleNetHttpTransport.newTrustedTransport(), JacksonFactory.getDefaultInstance(), clientSecrets,
                scopes).setDataStoreFactory(new FileDataStoreFactory(new java.io.File("tokens")))
                        .setAccessType("offline").build();
        Credential credential = new AuthorizationCodeInstalledApp(flow, new LocalServerReceiver()).authorize("user");
        return credential;

    }

    public static Sheets getSheetsService() throws IOException, GeneralSecurityException {
        Credential credential = authorize();
        return new Sheets.Builder(GoogleNetHttpTransport.newTrustedTransport(), JacksonFactory.getDefaultInstance(),
                credential).setApplicationName(APPLICATION_NAME).build();

    }

    public static void main(String[] args) throws IOException, GeneralSecurityException {
        Scanner scanner = new Scanner(System.in);
        int cutPlace;

        if (args.length == 0) {
            System.out.println("Do you want the results in a file? y/n");
            String ans = scanner.next();
            if (ans.equals("y")) {
                resultsInFile = true;
            }
            System.out.println("What place was the cut made at?");
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

        Scanner sc = new Scanner(new File("FantasyGolf/src/main/java/teams.csv"));
        sc.useDelimiter(","); // sets the delimiter pattern

        List<List<String>> entries = new LinkedList<>();
        for (int teams = 0; teams < 31; teams++) {
            List<String> team = new LinkedList<>();
            for (int player = 0; player < 9; player++) {
                if (sc.hasNext())
                    team.add(sc.next());
            }
            entries.add(team);

        }
        sc.close();
        System.out.println("Done");

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
            // System.out.println(++teamsDone);
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
