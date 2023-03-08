package GameConfig.Region;

import GameConfig.Player.GamePlayer;
import GameConfig.Player.Player;

public class GameRegion implements Region{
    private final int location;
    private GamePlayer owner;
    private long deposit;
    private final long max_deposit;

    private  int row, col;
    public GameRegion(int location, long max_deposit) {
        this.location = location;
        this.max_deposit = max_deposit;
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
    public void updateOwner(GamePlayer owner) {
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


}
