public class RelocateCommand extends ActionCommand {
    private final int rowDelta;
    private final int colDelta;

    public RelocateCommand(int rowDelta, int colDelta) {
        this.rowDelta = rowDelta;
        this.colDelta = colDelta;
    }

    @Override
    public void execute(GameState state) {
        // Check if the player has enough budget to relocate
        int minDist = Math.max(Math.abs(rowDelta), Math.abs(colDelta));
        int cost = 5 * minDist + 10;
        if (state.getBudget() < cost || !state.isPlayerRegion()) {
            return;
        }

        // Set the new city center location and deduct the relocation cost
        int[] newLocation = {state.getCityCenterLocation()[0] + rowDelta, state.getCityCenterLocation()[1] + colDelta};
        state.setCityCenterLocation(newLocation);
        state.setBudget(state.getBudget() - cost);
    }
}