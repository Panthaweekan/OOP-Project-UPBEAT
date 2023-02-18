public class MoveCommand extends ActionCommand {
    private final Direction direction;

    public MoveCommand(Direction direction) {
        this.direction = direction;
    }

    @Override
    public void execute(GameState state) {
        int[] currentLocation = state.getCityCenterLocation();
        int row = currentLocation[0];
        int col = currentLocation[1];
        int rowDelta = direction.getRowDelta();
        int colDelta = direction.getColDelta();
        int newRow = row + rowDelta;
        int newCol = col + colDelta;
        if (newRow < 0 || newRow >= state.getM() || newCol < 0 || newCol >= state.getN()) {
            return; // no-op
        }
        long deposit = state.getDeposit(newRow * state.getN() + newCol);
        if (deposit < 0) {
            return; // no-op
        }
        state.setCityCenterLocation(new int[]{newRow, newCol});
        state.setBudget(state.getBudget() - 1);
    }
}
