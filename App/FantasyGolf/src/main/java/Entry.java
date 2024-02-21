import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Entry {
    private String name;
    private float score=0;
    private ArrayList<Player> roster = new ArrayList<Player>();
    public boolean ALLCUT = false;
    public boolean WORST_IN_25 = false;

    public Entry(String name, ArrayList<Player> roster) {
        //remove newline characters
        String cleanedName = name.replace("\n", "").replace("\r", "");
        this.name = cleanedName;
        this.roster = roster;
    }
    public void score(String worstIn25) {
        boolean allCut = true;
        float score = 0;

        for (Player p : roster) {
            if (p.getName().equalsIgnoreCase(worstIn25)) {
                WORST_IN_25 = true;
                score += 15;
            }
            p.score();
            score += p.getPoints();
            allCut = allCut && p.getCut();
        }

        //If every player on the team makes the cut, you get a bonus
        if (allCut) {
            this.ALLCUT = true;
            score += 15;
        }
        this.score = score;
    }

    /**
     * Returns the roster of players on a team
     * @return Array list of players
     */
    public ArrayList<Player> getEntry () {
        return this.roster;
    }

    public float getScore() {
        return this.score;
    }

    public String getName() {
        return this.name;
    }
    public static void main(String[] args) {
        ArrayList<Player> r = new ArrayList<>();
        Player p = new Player("lowry",false, false);
        p.inputResults(4, true);
        p.setRanking(35);
        r.add(p);

        Entry e = new Entry("sammy", r);
       
        System.out.println(e.getScore());
    }

}
