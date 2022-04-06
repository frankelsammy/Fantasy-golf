//This class will get the updated finishes of each player

import java.util.LinkedList;
import java.io.File;  // Import the File class
import java.io.FileNotFoundException;  // Import this class to handle errors
import java.util.Scanner; // Import the Scanner class to read text files

public class Results {
    LinkedList<Player> leaderboard;
    LinkedList<String> rankings;
    Results() {
        leaderboard = new LinkedList<>();
        rankings = new LinkedList<>();
    }

    public void inputResultsAndRankings() {
        inputRankings();
        inputResults();
    }

    //reads rankings from text file
    private void inputRankings() {
        try {
            File myObj = new File("rankings.txt");
            Scanner myReader = new Scanner(myObj);

            while (myReader.hasNextLine()) {
                String [] s = myReader.nextLine().split(": ");
                rankings.addLast(s[1]);
            }
            myReader.close();
        } catch(FileNotFoundException e) {
            System.out.println("File not found");
            e.printStackTrace();
        }
    }

    public int getRanking(String s) {
        int index = -1;
        for (String player : rankings) {
            if (player.equalsIgnoreCase(s)) {
                index = rankings.indexOf(player);
            }

        }
        return index == -1 ? 100 : 1 + index;
    }

    //reads results from Python code which calls API to get real-time results
    private void inputResults() {
        try {
            File myObj = new File("leaderboard.txt");
            Scanner myReader = new Scanner(myObj);
            
            while (myReader.hasNextLine()) {
                String [] s = myReader.nextLine().split(": ");
                Player p = new Player(s[0], Integer.parseInt(s[1]));
                leaderboard.add(p);

            }
            myReader.close();
          } catch (FileNotFoundException e) {
            System.out.println("File not found");
            e.printStackTrace();
          }

    }

    //retrurns place that player is in. Only works for last names
    //If player is not present in the list, a -1 is returned. 
    public int getResult(String name) {
        for (Player p : leaderboard) {
            if (p.name.equalsIgnoreCase(name)) {
                return p.place;
            }
        }
        return 1000;
    }


    class Player {
        String name;
        int place;

        Player(String name, int place) {
            this.name = name;
            this.place = place;
        }
    }
    public static void main(String[] args) {
        Results a = new Results();
        a.inputResultsAndRankings();

        System.out.println(a.getRanking("mcilroy"));
    }
}
