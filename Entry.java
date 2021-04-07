import java.util.ArrayList;
public class Entry {
    private String name;
    private ArrayList<Player> roster = new ArrayList<Player>();
    private float totalScore;
    private final int MAXSIZE = 8;
    

    //create new Entry
    public Entry(String name, ArrayList<Player> roster) {
        this.name = name;
        this.roster = roster;

       
    }

    public void score() {
        for (Player p : roster) {
            p.reset();
            p.score();
            this.totalScore += p.getPoints();
        }
        cutBonus();

    }

    private void cutBonus() {
        boolean allCut = true;
        for (Player p: roster) {
           allCut =  allCut && p.getCut();
        }
        if (allCut)
            this.totalScore += 10;


    }
    public float getScore() {
        return totalScore;
    }
    public void worstBonus() {
        this.totalScore += 15;
    }

    public void results() {
        System.out.println(name + ": " + totalScore + " pts"); 

    }
    public String getName() {
        return this.name;
    }
    public ArrayList<Player> getPlayers() {
        return this.roster;

    }



}