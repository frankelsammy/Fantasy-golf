import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class League {
    private ArrayList<Entry> entries = new ArrayList<Entry>();
    private int NUMPLAYERS;

    //Constructor to create a new competition
    public League(int n) {
        NUMPLAYERS = n;
    }

    public void addEntry() {
        Scanner s = new Scanner(System.in);
        System.out.println("What is the name of the participant?");
        String part = s.nextLine();
        ArrayList<Player> roster = new ArrayList<Player>();
        
        int i = 0;
        while (i < NUMPLAYERS) {
            Player a;
            String name = "";
            if (i == 0) {
                System.out.println("Enter your number one player: ");
                
            }
            if (i == 1) {
                System.out.println("Enter your number 2 player:");
                
                
            }
            if (i >= 2) {
                System.out.println("Enter next player: ");
                
            }
            name = s.nextLine();
            System.out.println("Enter their ranking: ");        
            int ranking = s.nextInt();
            s.nextLine();
           
            
            if (i == 0) 
                a = new Player(name, ranking, true, false);                                
            else if (i == 1)
                 a = new Player(name,ranking,false,true);
            else 
                a = new Player(name,ranking,false,false);
            
            roster.add(a);
            
            i++;
           
        }

        Entry e = new Entry(part, roster);  
        this.entries.add(e);     
    }

    public void getResults() {
        bonus();
        for (Entry e : this.entries) {
            e.score();            
            e.results();
            
        }

    }

    public void inputResults () {        
        Scanner s = new Scanner(System.in);
        for (Entry e : this.entries) {
            System.out.println("Enter results for team: " + e.getName());
            System.out.println(". . . . .");

            for (Player p :e.getPlayers()) {
                System.out.println("Where did " + p.getName() + " finish?");
                int finish = s.nextInt();
                s.nextLine();
                System.out.println("Did they make the cut? y/n");
                String cut = s.nextLine();

                if (cut.equals("y")) {
                    p.inputResults(finish, true);
                } else
                    p.inputResults(finish, false);

                
            }

            clearScreen();


        }
        

        
    }
    //Bonus points to team with worst ranked player to make the top 25
    private void bonus() {
        Scanner s = new Scanner(System.in);
        System.out.println("Which team gets the bonus? \n TYPE none if none");
        String team = s.nextLine();
        
        team = team.toLowerCase();

        for (Entry e : this.entries) {
            if (e.getName().toLowerCase().equals(team))
                e.worstBonus();
        }

    }
    //Clears the terminal screen, to make inputting data much easier. 
    public static void clearScreen() {  
        System.out.print("\033[H\033[2J");  
        System.out.flush();  
       }  


    public static void main(String[] args) throws InterruptedException, IOException {
    Scanner s = new Scanner(System.in);
    System.out.println("How many teams are in this competition?");
    int numTeams = s.nextInt();
    s.nextLine();
    System.out.println("How many players per team?");
    int numPlayers= s.nextInt();
    s.nextLine();
    League a = new League(numPlayers);
     
    for (int i = 0; i < numTeams; i++) {
        a.addEntry();
        if (i != numTeams -1) {
            clearScreen();
            System.out.println("NEXT PARTICIPANT");
        }
    }
    clearScreen();
    a.inputResults();

    clearScreen();
    a.getResults();       
    }



}

