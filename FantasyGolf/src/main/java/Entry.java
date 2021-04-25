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
        this.name = name;
        this.roster = roster;
    }
    public void score() {
        boolean allCut = true;
        float score = 0;

        for (Player p : roster) {
            p.score();
            score += p.getPoints();
            allCut = allCut && p.getCut();
        }

        //If every player on the team makes the cut, you get a bonus
        if (allCut) {
            this.ALLCUT = true;
            score += 10;
        }
        this.score = score;
    }

    //15 bonus points for worst ranked player who made it to the top 25
    //Command line will ask you who gets this
    public void bonus() {
        this.score += 15;
        WORST_IN_25 = true;
    }

    public ArrayList<Player> getEntry () {
        return this.roster;
    }

    public float getScore() {
        return this.score;
    }

    public String getName() {
        return this.name;
    }

}