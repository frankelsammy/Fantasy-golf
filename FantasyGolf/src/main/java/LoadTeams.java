import java.io.*;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

public class LoadTeams {
	public static void main(String[] args) throws Exception {
		// parsing a CSV file into Scanner class constructor
		Scanner sc = new Scanner(new File("FantasyGolf/src/main/java/teams.csv"));
		sc.useDelimiter(","); // sets the delimiter pattern
		
		List<List<String>> entries = new LinkedList<>();
		for (int teams = 0; teams < 31; teams ++ ) {
			List<String> team = new LinkedList<>();
			for (int player = 0; player < 9; player++) {
				if (sc.hasNext())
					team.add(sc.next());
			}
			entries.add(team);
		}
		for (int i = 0; i < entries.get(30).size(); i++) {
			System.out.println(entries.get(30).get(i));
		}
		sc.close(); // closes the scanner
	}
}