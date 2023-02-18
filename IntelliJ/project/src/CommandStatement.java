public class CommandStatement extends Statement {
    private final Command command;

    public CommandStatement(Command command) {
        this.command = command;
    }

    @Override
    public void execute(GameState state) {
        command.execute(state);
    }
}
