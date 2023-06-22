import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class CSVLineCounter {
	public static int numLinesCSV(String file) {
		int lineCount = 0;

		try (BufferedReader br = new BufferedReader(new FileReader(file))) {
			String line;

			while ((line = br.readLine()) != null) {
				lineCount++;
			}

			
		} catch (IOException e) {
			e.printStackTrace();
		}
		return lineCount;
	}

	public static void main(String[] args) {
		int numTeams = numLinesCSV("App/FantasyGolf/src/main/resources/teams.csv");
		System.out.println(numTeams);
		
	}
}
