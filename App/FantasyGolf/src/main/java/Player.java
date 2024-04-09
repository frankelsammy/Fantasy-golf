public class Player {
    private String name;
    private int ranking = -1;
    private boolean first;
    private boolean second;
    private int finish;
    private boolean madeCut;
    private double points;

    // A player is created. Entering name, ranking, true/false
    // if first choice. false/true if second. false/fase if neither
    public Player(String name, boolean first,
            boolean second) {
        this.name = name;
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

    public void setRanking(int ranking) {
        this.ranking = ranking;
    }

    public void score() {
        double currentPoints = 0;

        // 5 points if made cut and ranking outside top 5
        if (madeCut && ranking > 5) {
            currentPoints += 5;
        }
        if (finish <= 25) {
            currentPoints += 3;
            // if ranking outside of top 10 but in top 20, 6 bonus points
            if (ranking <= 20 && ranking > 10) {
                currentPoints += 6;
            }
            if (ranking > 20) {
                currentPoints += 11;
            }
        }

        // 4 points to top 15
        if (finish <= 15) {
            currentPoints += 4;
        }
        if (finish <= 10) {
            currentPoints += (11 - finish);
        }

        // 15 bonus points if winner
        if (finish == 1) {
            currentPoints += 15;
        }

        // First and Second choice players bonus
        if (first) {
            currentPoints = currentPoints * 2;
        }
        if (second) {
            currentPoints = currentPoints * 1.5;
        }

        this.points = currentPoints;
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

    /**
     * 
     * @return the amount of points a player scored
     */
    public double getPoints() {
        return this.points;
    }

    public int getFinish() {
        return finish;
    }
}
