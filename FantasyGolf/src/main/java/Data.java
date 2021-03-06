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
import java.util.Scanner;
import java.util.concurrent.TimeUnit;

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

    // returns the range in which the results should be added to sheet
    private static String getColResult(int numPlayer, int row) {
        switch (numPlayer) {
            case 0:
                return "D" + Integer.toString(row);
            case 1:
                return "H" + Integer.toString(row);
            case 2:
                return "L" + Integer.toString(row);
            case 3:
                return "P" + Integer.toString(row);
            case 4:
                return "T" + Integer.toString(row);
            case 5:
                return "X" + Integer.toString(row);
            case 6:
                return "AB" + Integer.toString(row);
            case 7:
                return "AF" + Integer.toString(row);
            default:
                return null;
        }

    }

    // returns the range for adding madeCut to sheet
    private static String getColCut(int numPlayer, int row) {
        switch (numPlayer) {
            case 0:
                return "E" + Integer.toString(row);
            case 1:
                return "I" + Integer.toString(row);
            case 2:
                return "M" + Integer.toString(row);
            case 3:
                return "Q" + Integer.toString(row);
            case 4:
                return "U" + Integer.toString(row);
            case 5:
                return "Y" + Integer.toString(row);
            case 6:
                return "AC" + Integer.toString(row);
            case 7:
                return "AG" + Integer.toString(row);
            default:
                return null;
        }

    }
    private static String getcolRank(int numPlayer, int row) {
        switch (numPlayer) {
            case 0:
                return "C" + Integer.toString(row);
            case 1:
                return "G" + Integer.toString(row);
            case 2:
                return "K" + Integer.toString(row);
            case 3:
                return "O" + Integer.toString(row);
            case 4:
                return "S" + Integer.toString(row);
            case 5:
                return "W" + Integer.toString(row);
            case 6:
                return "AA" + Integer.toString(row);
            case 7:
                return "AE" + Integer.toString(row);
            default:
                return null;
        }

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

        sheetsService = getSheetsService();
        // Range from first name of team to last made cut on bottom right
        String range = "A2:AG2";
        int teamsDone = 0;
        ValueRange response = sheetsService.spreadsheets().values().get(SPREADSHEET_ID, range).execute();
        List<List<Object>> values = response.getValues();

        if (values == null || values.isEmpty()) {
            System.out.println("No values found");
        } else {
            League league = new League(args);
            Results r = new Results();
            r.inputResultsAndRankings();
            int row = 2;
            for (List entry : values) {
                ArrayList<Player> roster = new ArrayList<Player>();
                // goes through the row, creates players, and inputs results
                for (int i = 0; i < 8; i++) {
                    boolean first = false, second = false;
                    if (i == 0)
                        first = true;
                    if (i == 1)
                        second = true;

                    // For every 4th column, create a player and add it to teams roster
                    Player p = new Player(entry.get(1 + (4 * i)).toString().replaceAll(" ", ""),
                            first, second);
                
                        int ranking = r.getRanking(p.getName());
                        
                        p.setRanking(ranking);
                    

                    // Upload finish for each player to Google Sheets
                    int finish = r.getResult(p.getName());
                    ValueRange body = new ValueRange().setValues(Arrays.asList(Arrays.asList(finish)));

                    // UpdateValuesResponse result = sheetsService.spreadsheets().values()
                            // .update(SPREADSHEET_ID, getColResult(i, row), body).setValueInputOption("RAW").execute();
                    
                    // Upload if they made cut or not
                    // Number will need to be changed based on what place the cut is made at

                
                    
                    // get results from sheet, add it to player
                    // finish, madeCut
                    p.inputResults(finish,
                            (finish <= cutPlace));

                    roster.add(p);

                    // Add a delay so number of writes doesn't exceed Google Quota
                    try {
                        TimeUnit.SECONDS.sleep(1);
                    } catch (InterruptedException e1) {
                        e1.printStackTrace();
                    }
                }
                System.out.println(++teamsDone);
                Entry e = new Entry(entry.get(0).toString(), roster);
                league.addEntry(e);
                row++;

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

                    for (Entry e : league.getEntries()) {
                        bw.write(e.getName() + ":\n");
                        ArrayList<Player> roster = e.getEntry();
                        for (int i = 0; i < 8; i++) {
                            bw.write(i + 1 + "." + roster.get(i).getName() + " (Finish:" + roster.get(i).getFinish() + ")" + ": " + roster.get(i).getPoints()
                                    + " pts \n");

                        }
                        if (e.ALLCUT) {
                            bw.write("Bonus for all players making the cut: 10.0 pts\n");
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
}
