public class Player {
    private String name;
    private int ranking;
    private boolean first;
    private boolean second;
    private int finish;
    private boolean madeCut;
    private float points;

    //A player is createed. Entering name, ranking, true/false 
    // if first choice. false/true if second. false/fase if neither
    public Player(String name, int ranking, boolean first, 
    boolean second) {
        this.name = name;
        this.ranking = ranking;
        if (first && second) {
            throw new IllegalArgumentException("Can't be first and second choice!");
        }

        this.first = first;
        this.second = second;
    }
    public void inputResults(int finish, boolean madeCut) {
        this.finish = finish;
        this.madeCut = madeCut;
    }

    public void score() {
        float score = 0;
        //made the cut
        if (madeCut)
            score += 3;
        //top 25
        if (finish <= 25)
            score += 4;
        //top 15
        if (finish <= 15)
            score += 4;
        //top 10
        if (finish <= 10) {
            int top10 =  11 - finish;
            score += top10;

        }
        if (finish == 1)
            score += 5;

        //bonus for first or second choice
        if (first) {
            if (ranking <= 8)
                score = score*2;
            else 
                score = score *3;
        }

        if (second) {
            score = (float) (score * 1.5);
           
        }


        this.points = score;
        this.bonus();
    }
    public float getPoints() {
        return this.points;
    }

    private void bonus() {
        if (ranking >= 6 && ranking <= 10) {
            if (finish <= 25)
                this.points += 4;
        }
        if (ranking >= 11 && ranking <= 20){
            if (finish <= 25)
                this.points += 8;
        }
        if (ranking > 20 && finish <= 25)
            this.points += 11;
            
    }
    public int getRanking() {
        return this.ranking;
    }
    public boolean getCut() {
        return this.madeCut;
    }

    public void reset() {
        this.points = 0;
    }
    public String getName() {
        return this.name;
    }



public static void main(String[] args) {
    Player a = new Player("Dustin Johnson", 21, false, false);
    a.inputResults(11, true);
    a.score();
    System.out.println(a.getPoints());
}


}