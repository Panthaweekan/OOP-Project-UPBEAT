import java.util.Objects;
import java.util.Scanner;

public class Player implements Overview.Player {
    static long cur_budget = init_budget;

    @Override
    public void Action() {
        Action_Command test = new Action_Command();
        Scanner scanner = new Scanner(System.in);
        String x = scanner.nextLine();
        if(Objects.equals(x, "move")){
            test.move();
        }


    }
}
