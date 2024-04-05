import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
public class AWSHandler implements RequestHandler<String, String> {

    public static void main(String[] args) {
        // Your main logic here
        Data data = new Data();
        data.run(); // Assuming run() is your main method's entry point
    }

    @Override
    public String handleRequest(String input, Context context) {
        // Your Lambda function logic here
        Data data = new Data();
        data.run(); // Invoke your main logic from the handler
        return "Hello from Lambda! Input: " + input;
    }
}
