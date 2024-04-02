import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.FileWriter;
import java.io.IOException;

public class League {
    private ArrayList<Entry> teams = new ArrayList<Entry>();
    public String worstPlayer;
    private ArrayList<String> listOfPlayers;

    public League() {
        listOfPlayers = new ArrayList<>();
    }

    public void addEntry(Entry e) {
        teams.add(e);
    }

    public ArrayList<Entry> getEntries() {
        return this.teams;

    }

    public void score() {

        for (Entry e : teams) {
            for (Player p : e.getEntry()) {
                listOfPlayers.add(p.getName());
            }
        }

        // find lowest ranked player to make top 25
        Results r = new Results();
        r.inputResultsAndRankings();
        LinkedList<Results.Player> top25 = r.top25ByRanking();
        String worst = "n/a";
        for (int i = top25.size() - 1; i >= 0; i--) {
            if (listOfPlayers.contains(top25.get(i).name)) {
                worst = top25.get(i).name;
            }
        }
        this.worstPlayer = worst;

        for (Entry e : teams) {
            e.score(worst);
        }

        // Sort the teams based on points scored
        Collections.sort(teams, new Comparator<Entry>() {
            public int compare(Entry a, Entry b) {
                return (Float.valueOf(b.getScore()).compareTo(Float.valueOf(a.getScore())));
            }
        });

        // Print results
        for (Entry e : teams) {
            System.out.println(e.getName() + ": " + e.getScore());

        }
    }

    /**
     * Takes the results of the tournament out creates a json file with all the results
     * @return String specifying whether the operation was done succesfully
     */
    public String makeJSONObject() {
        JSONObject jsonObject = new JSONObject();
        
        // Get the current date and time using Java 8 Date-Time API
        LocalDateTime currentDateTime = LocalDateTime.now();
        
        // Define the desired date and time format
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE, MMMM d h:mm a");

        // Format the current date and time using the formatter
        String formattedDateTime = currentDateTime.format(formatter);
        jsonObject.put("Date", formattedDateTime);

        // Create an array of JSON objects that will be the teams
        JSONArray entries = new JSONArray();
        
        try {
            //Go through each team's roster
            int place = 1;
            for (Entry team : this.getEntries()) {
                JSONObject entry = new JSONObject();
                entry.put("Name", team.getName());
                entry.put("Total Score", team.getScore());
                entry.put("Place", place++);
                JSONArray roster = new JSONArray();

                //Goes through each player and adds them to array of players
                for (Player p : team.getEntry()) {
                    JSONObject player = new JSONObject();
                    player.put("Name", p.getName());
                    player.put("Points scored", p.getPoints());
                    player.put("Finish", p.getFinish());
                    roster.put(player);
                }
                entry.put("Roster",roster);
                entry.put("AllCut", team.ALLCUT);
                entry.put("Worst25", team.WORST_IN_25);
                entries.put(entry);   
            }
            jsonObject.put("Teams",entries);
            
            
            
        } catch (JSONException e) {
            e.printStackTrace();
            return "Failed to make JSON Object"; 
        }

        // Specify the file path
        String filePath = "App/Database/Results.json";

        try (FileWriter fileWriter = new FileWriter(filePath)) {
            // Write the JSON object to the file
            fileWriter.write(jsonObject.toString());
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to make JSON file";
        }
    return "JSON file created successfully!";
    }
}