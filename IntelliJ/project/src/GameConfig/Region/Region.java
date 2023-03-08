package GameConfig.Region;

import GameConfig.Player.*;

public interface Region {
    Player getOwner();
    long getDeposit();
    void updateDeposit(long amount);
    void updateOwner(Player owner);
    int getLocation();
    int getRow();
    int getCol();
    void SetLocation(int row, int col);

}