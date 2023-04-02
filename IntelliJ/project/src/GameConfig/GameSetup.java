package GameConfig;

import AST.Node;
import AST.Statement.AssignmentNode;
import GameConfig.Player.GamePlayer;
import GameConfig.Player.Player;
import GameConfig.Region.GameRegion;
import GameConfig.Region.Region;
import Parser.GameParser;
import Parser.Parser;
import Tokenizer.ExprTokenizer;
import GameConfig.GameException.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

public class GameSetup {

    /** Initial configuration **/
    private static long rows = 9;
    private static long cols = 9;

    private static long init_plan_min = 10;

    private static long init_plan_sec = 0;
    private static long init_budget = 5000;
    private static long init_center_dep = 1000;

    private static long plan_rev_min = 5;

    private static long plan_rev_sec = 0;

    private static long rev_Cost = 500;
    private static long max_dep = 2500;
    private static long interest_pct = 5;

    /** Useful method for GameState to use after **/
    public static long getRows() {return rows;}
    public static long getCols() {return cols;}
    public static long getInit_budget() {return init_budget;}
    public static long getRev_Cost(){return rev_Cost;}
    public static long getMax_dep() {return max_dep;}
    public static long getInterest_pct() {return interest_pct;}
    public static long getInit_center_dep() { return init_center_dep;}
    private static List<Region> territory;


    public static GameState createGame(String p1, String p2){
        List<Region> territory = createMap();
        List<Player> players = new ArrayList<>();
        players.add(createPlayer(p1));
        players.add(createPlayer(p2));
        return new GameState(players , territory);
    }

    /**
     * effect : to create Map for GameState
     */
    public static List<Region> createMap(){
        territory = new ArrayList<>();
        for(int i = 0; i < rows * cols; i++){
            Region region = new GameRegion(i);
            int col = i % (int) cols != 0 ? (i % (int) cols) + 1 : 1;
            int row = (i / (int) cols) + 1;
            region.SetLocation(row, col);
            territory.add(region);
        }
        return territory;
    }

    /**
     * effect : to random city-cen foreach player
     */
    public static Region randomCityCenter(){
        Region region;
        Random random = new Random(); // random city-cen foreach player
        do {
            int location = random.nextInt(territory.size());
            region = territory.get(location);
        }while (region.getOwner() != null);
        return region;
    }

    /**
     * @param name
     * effect : create Player for GameState with Name init_budget and region
     */
    public static Player createPlayer(String name){
        if(territory == null || territory.size() == 0) return null;
        Region region = randomCityCenter();
        Player player = new GamePlayer(name, init_budget, region);
        region.updateOwner(player);
        region.updateDeposit(init_center_dep);
        return player;
    }

}
