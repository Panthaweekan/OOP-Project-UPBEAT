public class Action_Command implements Overview.Action_Command {
    @Override
    public void move(){
        Player.cur_budget -= 100;
        System.out.println(Player.cur_budget);
    }

    @Override
    public void invest() {

    }

    @Override
    public void shoot() {

    }

    @Override
    public void collect() {

    }

    @Override
    public void relocate() {

    }
}
