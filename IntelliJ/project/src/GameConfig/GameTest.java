package GameConfig;

import GameConfig.Player.GamePlayer;
import GameConfig.Player.Player;
import GameConfig.Region.Region;

import java.util.ArrayList;
import java.util.List;

/**
 * Not implement yet
 */
final class GameTest {
    List<Region> territory = GameSetup.createMap();
    List<Player> allPlayer = new ArrayList<>();
    Player p1 = new GamePlayer("Player 1" , GameSetup.getInit_budget() , territory.get(10));
    Player p2 = new GamePlayer("Player 2" , GameSetup.getInit_budget() , territory.get(5));
    public void setAllPlayer(Player p1 , Player p2) {
        allPlayer.add(p1);
        allPlayer.add(p2);
    }

    int col = (int) GameSetup.getCols();
    long action = 1;

}
