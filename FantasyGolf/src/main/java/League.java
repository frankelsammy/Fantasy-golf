import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Scanner;

public class League {
    private ArrayList<Entry> teams = new ArrayList<Entry>();
    public static String worstPlayer;

   

    public void addEntry(Entry e) {
        teams.add(e);
    }

    public ArrayList<Entry> getEntries() {
        return this.teams;

    }
    public void score() {
        Scanner s = new Scanner(System.in);
        System.out.println("Which team gets the Bonus?");
        String bonus = s.nextLine().toLowerCase();
        System.out.println("Which player was that?");
        this.worstPlayer = s.nextLine();
        

        for (Entry e: teams) {
            e.score();
            if (e.getName().toLowerCase().equals(bonus))
                e.bonus();

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
