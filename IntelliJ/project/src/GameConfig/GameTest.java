package GameConfig;

import GameConfig.Player.GamePlayer;
import GameConfig.Player.Player;
import GameConfig.Region.Region;
import GameConfig.GameState.*;
import GameConfig.Direction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Not implement yet
 */
final class GameTest {
    List<Region> territory = GameSetup.createMap();
    GameState game = GameSetup.createGame("p1", "p2");
    Player p1 = game.getPlayers(1);
    Player p2 = game.getPlayers(2);
    int col = (int) GameSetup.getCols();
    long action = 1;

}
