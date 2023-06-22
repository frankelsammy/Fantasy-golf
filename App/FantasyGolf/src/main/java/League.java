import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.Scanner;

public class League {
    private ArrayList<Entry> teams = new ArrayList<Entry>();
    public String worstPlayer;
    private String[] args;
    private ArrayList<String> listOfPlayers;

    public League(String[] args) {
        this.args = args;
        listOfPlayers = new ArrayList<>();
    }

    public void addEntry(Entry e) {
        teams.add(e);
    }

    public ArrayList<Entry> getEntries() {
        return this.teams;

    }


    public void score() {
        
        for (Entry e: teams) {
            for (Player p : e.getEntry()) {
                listOfPlayers.add(p.getName());
            }
        }

        //find lowest ranked player to make top 25
        Results r = new Results();
        r.inputResultsAndRankings();
        LinkedList<Results.Player> top25 = r.top25ByRanking();
        String worst =  "n/a";
        for (int i = top25.size()-1; i >= 0; i--) {
            if (listOfPlayers.contains(top25.get(i).name)) {
                worst = top25.get(i).name;
            }
        }
        this.worstPlayer = worst;

        


        for (Entry e: teams) {
            e.score(worst);
            

        }
        
        //Sort the teams based on points scored
        Collections.sort(teams,new Comparator<Entry>() {
            public int compare(Entry a, Entry b) {
                return (Float.valueOf(b.getScore()).compareTo(Float.valueOf(a.getScore())));
            }
        });

        //Print results
        for (Entry e: teams) {
            System.out.println(e.getName() + ": " + e.getScore());

        }
    }

}