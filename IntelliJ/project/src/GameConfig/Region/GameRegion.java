package GameConfig.Region;

import GameConfig.GameSetup;
import GameConfig.Player.Player;

public class GameRegion implements Region{
    private final int location;
    private Player owner;
    private long deposit;
    private final long max_deposit = GameSetup.getMax_dep(); // set max_dep foreach region!
    private  int row, col;
    public GameRegion(int location) {
        this.location = location;
        this.owner = null;
        this.deposit = 0;
    }

    @Override
    public Player getOwner() {
        return this.owner;
    }

    @Override
    public long getDeposit() {
        return this.deposit;
    }

    @Override
    public void updateDeposit(long amount) {
        this.deposit = Math.max(0, this.deposit + amount);
        this.deposit = Math.min(this.deposit, max_deposit);
    }

    @Override
    public void updateOwner(Player owner) {
        this.owner = owner;
    }

    @Override
    public int getLocation() {
        return this.location;
    }

    @Override
    public int getRow() {
        return this.row;
    }

    @Override
    public int getCol() {
        return this.col;
    }
    @Override
    public void SetLocation(int row, int col) {
        this.row = row;
        this.col = col;
    }


}
