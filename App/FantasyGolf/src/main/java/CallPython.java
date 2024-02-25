import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class CallPython {
	public static void updateLeaderboard() {
		try {
			String pythonScriptPath = "/Users/sammyfrankel/FantasyGolf/App/data/golf.py";

			// Create a ProcessBuilder for running the Python script
			ProcessBuilder processBuilder = new ProcessBuilder("python3", pythonScriptPath);

			// Redirect error stream to standard output
			processBuilder.redirectErrorStream(true);

			// Start the process
			Process process = processBuilder.start();

			process.waitFor();
			System.out.println("Leaderboard updated");

		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}
	}

	public static void updateDatabase() {
		try {
			String pythonScriptPath = "/Users/sammyfrankel/FantasyGolf/App/Database/updateDB.py";

			// Create a ProcessBuilder for running the Python script
			ProcessBuilder processBuilder = new ProcessBuilder("python3", pythonScriptPath);

			// Redirect error stream to standard output
			processBuilder.redirectErrorStream(true);

			// Start the process
			Process process = processBuilder.start();

			// Read the output from the Python script
			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
			String line;
			while ((line = reader.readLine()) != null) {
				System.out.println(line);
			}

			// Wait for the process to finish
			int exitCode = process.waitFor();
			System.out.println("Python script exited with code: " + exitCode);

		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}
	}

}
