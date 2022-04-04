//This class will get the updated finishes of each player

import java.util.LinkedList;
import java.io.File;  // Import the File class
import java.io.FileNotFoundException;  // Import this class to handle errors
import java.util.Scanner; // Import the Scanner class to read text files

public class Results {
    LinkedList<Player> leaderboard;

    Results() {
        leaderboard = new LinkedList<>();
    }

    //reads results from Python code which calls API to get real-time results
    public void inputResults() {
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
        return -1;
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
        a.inputResults();

        System.out.println(a.getResult("Knox"));
    }
}
