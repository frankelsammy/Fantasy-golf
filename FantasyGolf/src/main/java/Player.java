public class Player {
    private String name;
    private int ranking;
    private boolean first;
    private boolean second;
    private int finish;
    private boolean madeCut;
    private float points;

    //A player is created. Entering name, ranking, true/false
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
        this.bonus();
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
        //bonus for winning
        if (finish == 1)
            score += 5;

        this.points += score;

        //bonus points for first and second choices
        if (first) {
            if (ranking <= 8)
                this.points = this.points*2;
            else
                this.points *= 3;
        }

        if (second) {
            this.points *= 1.5;

        }

    }
    public float getPoints() {
        return this.points;
    }

    //A special bonus for players who weren't in the top 5, but still finished in top 25
    private void bonus() {
        if (ranking >= 6 && ranking <= 10 && finish <=25) {

            this.points = 4;

        }
        else if (ranking >= 11 && ranking <= 20 && finish <=25){
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

    public String getName() {
        return this.name;
    }



}
