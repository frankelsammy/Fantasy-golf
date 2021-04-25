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
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.ValueRange;
public class Data {
    public static Sheets sheetsService;
    private static String APPLICATION_NAME = "sheets example";
    
                                            //This is the ID of the google sheets page
    private static String SPREADSHEET_ID = "1Zr0aXoVahHXpgi7EHsToW1a3hccXEDjnkWFRahN_3Vw";
    public static boolean resultsInFile = false;

    public static Credential authorize() throws IOException, GeneralSecurityException {
        InputStream in = Data.class.getResourceAsStream("/credentials.json");
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JacksonFactory.getDefaultInstance(),
                new InputStreamReader(in));
        List<String> scopes = Arrays.asList(SheetsScopes.SPREADSHEETS);
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),JacksonFactory.getDefaultInstance(),
                clientSecrets, scopes).setDataStoreFactory(new FileDataStoreFactory
                (new java.io.File("tokens"))).setAccessType("offline").build();
        Credential credential = new AuthorizationCodeInstalledApp(
                flow, new LocalServerReceiver()).authorize("user");
        return credential;

    }

    public static Sheets getSheetsService() throws IOException, GeneralSecurityException{
        Credential credential = authorize();
        return new Sheets.Builder(GoogleNetHttpTransport.newTrustedTransport(),JacksonFactory.getDefaultInstance(),
                credential).setApplicationName(APPLICATION_NAME).build();

    }

    public static void main(String[] args) throws IOException, GeneralSecurityException {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Do you want the results in a file? y/n");
        String ans = scanner.next();
        if (ans.equals("y")) {
            resultsInFile = true;
        }

        sheetsService = getSheetsService();
        String range = "A2:AG5";
        ValueRange response = sheetsService.spreadsheets().values().
                get(SPREADSHEET_ID,range).execute();
        List<List<Object>> values = response.getValues();

        if (values == null || values.isEmpty()) {
            System.out.println("No values found");
        } else {
            League league = new League();
           for (List entry : values) {
               ArrayList<Player> roster = new ArrayList<Player>();
               //goes through the row, creates players, and inputs results
               for (int i =0; i < 8; i++) {
                   boolean first = false, second = false;
                   if (i==0)
                       first = true;
                   if (i == 1)
                       second = true;
                   Player p = new Player(entry.get(1 + (4*i)).toString(), Integer.parseInt(entry.get((4*i)+2).toString()),
                           first, second);


                   p.inputResults(Integer.parseInt(entry.get((4*i)+3).toString()), (entry.get((4*i)+4).toString()
                   .equals("yes")));

                   roster.add(p);
               }
               Entry e = new Entry(entry.get(0).toString(), roster);
               league.addEntry(e);

           }
           //Print final results
            league.score();

            //putting the results into a text file
            if (resultsInFile) {
                String fileName = "/Users/sammyfrankel/IdeaProjects/FantasyGolf/src/main/results";
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
                    FileWriter edit = new FileWriter(fileName,true);
                    BufferedWriter bw = new BufferedWriter(edit);
                    
                    for (Entry e: league.getEntries()) {
                        bw.write(e.getName()+":\n");
                        ArrayList<Player> roster = e.getEntry();
                        for (int i = 0; i < 8; i++) {
                            bw.write(i+1 + "." + roster.get(i).getName()+ ": " + roster.get(i).getPoints() + " pts \n");

                        }
                        if (e.ALLCUT) {
                            bw.write("Bonus for all players making the cut: 10.0 pts\n");
                        }
                        if (e.WORST_IN_25) {
                            bw.write("Bonus for having the worst ranked player in top 25 " + "("
                            + league.worstPlayer + "):  15.0 pts \n");
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
