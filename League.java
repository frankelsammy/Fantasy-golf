import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;
//This is the file in which the League is created and executed. 
public class League {
    private ArrayList<Entry> entries = new ArrayList<Entry>();
    private int NUMTEAMS;

    public League(int n) {
        NUMTEAMS = n;
    }

    public void addEntry() {
        Scanner s = new Scanner(System.in);
        System.out.println("What is the name of the participant?");
        String part = s.nextLine();
        ArrayList<Player> roster = new ArrayList<Player>();
        
        int i = 0;
        while (i < 3) {
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




        }
        

        
    }
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



    public static void main(String[] args) throws IOException {
    Scanner s = new Scanner(System.in);
    System.out.println("How many teams are in this competition?");
    int numTeams = s.nextInt();
    s.nextLine();
    League a = new League(2);
     
    for (int i = 0; i < numTeams; i++) {
        a.addEntry();
        if (i != numTeams -1)
            System.out.println("NEXT PARTICIPANT");

    }
    Runtime.getRuntime().exec("/bin/bash -c clear");
    
    a.inputResults();
    a.getResults();       
    }



}
