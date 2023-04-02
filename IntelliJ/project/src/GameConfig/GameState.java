package GameConfig;

import AST.Node;
import GameConfig.Player.Player;
import GameConfig.Region.GameRegion;
import GameConfig.Region.Region;
import Parser.GameParser;
import Parser.Parser;
import Tokenizer.ExprTokenizer;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class GameState implements GameCommand{

    // private final Player p1, p2; old version
    private final List<Player> players;
    private final List<Region> territory;
    private final long Cost = 1;
    private Player curr_player;
    private Region cityCrew;
    private String Plan1, Plan2;
    private int turn;

    /**
     * @param players
     * @param territory
     * effect : initialized gameState for 2 player with current player turn
     */
    public GameState(List<Player> players, List<Region> territory) {
        this.territory = territory;
        this.players = players;
        this.curr_player = this.players.get(0); // not really sure but I don't think it gonna worked ;-;
        this.turn = 1;
    }

    public Player getPlayers(int index){ // for-testing now 13/3/2023
        return players.get(index);
    }


    private boolean checkBudget() {
        return curr_player.getBudget() >= Cost;
    }

    /**
     * @param dir
     * @param v
     * effect : attack TargetRegion to make that region no-owner if attack-value more than region_dep
     *        : else -> region_dep - attack-value (to make TargetRegion have less-dep)
     */
    @Override
    public boolean attack(Direction dir, long v) {
        if(checkBudget()) {
            curr_player.updateBudget(-Cost);
            if(curr_player.getBudget() < v || v < 0) return false;
            int location = cal_newMove(dir, cityCrew.getLocation(), cityCrew.getCol());
            if(location != -1) {
                Region targetRegion = territory.get(location);
                if (targetRegion != null) {
                    if (v < targetRegion.getDeposit()) {
                        targetRegion.updateDeposit(-v);
                    } else {
                        targetRegion.updateDeposit(-targetRegion.getDeposit());
                        targetRegion.updateOwner(null);
                    }
                    curr_player.updateBudget(-v);
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * @param dir
     * @param location
     * @param col
     * effect : to calculated direction location in current-col to sample move
     */
    public int cal_newMove(Direction dir, int location , int col){
        int curr_cols = (int) GameSetup.getCols();
        switch (dir) {
            case Up -> location -= curr_cols;
            case UpLeft -> {
                if(col == 1) location = -1;
                else {
                    if (col % 2 == 0) location -= (curr_cols + 1);
                    else location--;
                }
            }
            case UpRight -> {
                if(col == curr_cols) location = -1;
                else {
                    if (col % 2 == 0) location += 1 - curr_cols;
                    else location++;
                }
            }

            case Down -> location += curr_cols;
            case DownLeft -> {
                if(col == 1) location = -1;
                else {
                    if (col % 2 == 0) location--;
                    else location += curr_cols - 1;
                }
            }
            case DownRight -> {
                if(col == curr_cols) location = -1;
                else {
                    if (col % 2 == 0) location++;
                    else location += curr_cols + 1;
                }
            }
        }

        if(location < 0 || location >= territory.size()) return -1;
        else return location;
    }

    /**
     * @param v
     * effect : to collect the targetRegion-dep to current-player budget (value-v)
     */
    @Override
    public boolean collect(long v) {
        if(v < 0 || !checkBudget())
            return false;
        curr_player.updateBudget(-Cost);
        Region targetRegion = cityCrew;
        if(targetRegion.getOwner() != curr_player)
            return false;
        if(v > targetRegion.getDeposit() || v <= 0){
            return false;
        }
        curr_player.updateBudget(v);
        targetRegion.updateDeposit(-v);
        if(targetRegion.getDeposit() == 0)
            targetRegion.updateOwner(null);
        return true;
    }

    /**
     * @param v
     * effect : to check if that region get at least one adjacent then
     *        : start invest to that cityCrew and updated owner
     */
    @Override
    public boolean invest(long v) {
        if(checkBudget()) {
            int sample;
            int count = 0;
            long cc_dep = cityCrew.getDeposit(); // cc -> cityCrew
            long max_dep = GameSetup.getMax_dep();
            curr_player.updateBudget(-Cost);
            if(cityCrew.getOwner()!= curr_player) {
                for (int i = 0; i < 6; i++) {  // at-least one Adjacent
                    sample = cal_newMove(Direction.values()[i], cityCrew.getLocation(), cityCrew.getCol());
                    if (sample == -1) {
                        count++;
                        continue;
                    }
                    if (territory.get(sample).getOwner() != curr_player) count++;
                }
                if (count == 6) return false;
            }
            if(curr_player.getBudget() < v || v <= 0) return false;
            if(cityCrew.getOwner() != null && cityCrew.getOwner() != curr_player) return false;
            if(cc_dep == max_dep) return false; // can't invest
            if(cc_dep + v > max_dep){
                long invest = max_dep - cc_dep;
                cityCrew.updateDeposit(invest);
                curr_player.updateBudget(-invest);
            } else {
                cityCrew.updateDeposit(v);
                curr_player.updateBudget(-v);
            }
            cityCrew.updateOwner(curr_player);
            return true;
        }
        return false;
    }

    @Override
    public boolean relocate() {
        if(checkBudget()){
            curr_player.updateBudget(-Cost);
            if(cityCrew.getOwner() == curr_player) {
                int cityCenterRow = curr_player.getCityCenter().getRow();
                int cityCenterCol = curr_player.getCityCenter().getCol();
                int cityCrewRow = cityCrew.getRow();
                int cityCrewCol = cityCrew.getCol();
                int distance = (int) Math.floor(Math.sqrt(Math.pow(cityCenterRow - cityCrewRow, 2) + Math.pow(cityCenterCol - cityCrewCol, 2)));
                if (distance < 0) distance = 1;
                int cost = (5 * distance) + 10;
                if (curr_player.getBudget() >= cost) {
                    curr_player.updateBudget(-cost);
                    cityCrew.updateOwner(curr_player);
                    curr_player.updateCityCenter(cityCrew);
                }
                return true;
            }
        }
        return false;
    }

    /**
     * @param dir
     * effect : return the opponent's region closest to the current location of the city crew in a given direction
     */
    @Override
    public long nearby(Direction dir) {
        long dist = 0;
        int location = cal_newMove(dir, cityCrew.getLocation(), cityCrew.getCol());
        Region targetRegion;
        while (location != -1) {
            targetRegion = territory.get(location);
            dist++;
            if (targetRegion.getOwner() != curr_player && targetRegion.getOwner() != null)
            return ((dist + 1L) * 100 + (long) (Math.log10(targetRegion.getDeposit() + 1)) + 1);
            location = cal_newMove(dir, targetRegion.getLocation(), targetRegion.getCol());
        }
        return 0L;
    }

    @Override
    public boolean move(Direction dir) {
        if(checkBudget()) {
            curr_player.updateBudget(-Cost);
            int location = cal_newMove(dir, cityCrew.getLocation(), cityCrew.getCol());
            if(location == -1) return false;
            if(territory.get(location).getOwner() != null
                    && territory.get(location).getOwner() != curr_player) return false;
            cityCrew = territory.get(location);
            return true;
        }
        return false;
    }

    @Override
    public long opponent() {
        Region[] areas = new GameRegion[6];
        long distance = 0;
        boolean stop;
        Arrays.fill(areas, cityCrew);
        do {
            for(int i = 0 ; i < 6; i++){
                if(areas[i] == null) continue;
                long location = areas[i].getLocation();
                Player player = territory.get((int) location).getOwner();
                if(player != null && player != curr_player)
                    return i + 1L + (distance * 10L);
                int mockLocation = cal_newMove(Direction.values()[i], (int) location, areas[i].getCol());
                if(mockLocation != -1)
                    areas[i] = territory.get(mockLocation);
                else areas[i] = null;
            }
            stop = true;
            for(Region region : areas) stop = stop && (region == null);
            distance++;
        } while (!stop);
        return 0;
    }

    @Override
    public long getRow() {
        return GameSetup.getRows();
    }

    @Override
    public long getCol() {
        return GameSetup.getCols();
    }

    @Override
    public long getCityCrew_Row() {
        return cityCrew.getRow();
    }

    @Override
    public long getCityCrew_Col() {
        return cityCrew.getCol();
    }

    @Override
    public List<Region> getTerritory() {
        return this.territory;
    }

    @Override
    public Region getRegion(int location) {
        return this.territory.get(location);
    }

    @Override
    public Region getCityCrew() {
        return this.cityCrew;
    }

    @Override
    public long getBudget() {
        return curr_player.getBudget();
    }

    @Override
    public long getDep() {
        return cityCrew.getDeposit();
    }

    @Override
    public long getInterest() {
        return GameSetup.getInterest_pct();
    }

    @Override
    public long getMax_dep() {
        return GameSetup.getMax_dep();
    }

    private double CalRate(long d){
        long b = GameSetup.getInterest_pct();
        return b*Math.log10(d)*Math.log(turn);
    }
    private void CalculateInterest() {
        //the interest for the region in the current turn is d*r/100
        // d is the current deposit of a region
        // r is the interest rate percentage
        //the interest rate percentage r to be used is b * log10 d * ln t
        // b is the base interest rate percentage as specified in the configuration file
        // d is the current deposit of a region
        // t is the current turn count of a player
        long max = GameSetup.getMax_dep();
        for(Region region: territory) {
            long d = region.getDeposit();
            if(d == max || d == 0) continue;
            double r = CalRate(d);
            double i = d*r/100;
            region.updateDeposit(Math.round(i));
        }
    }
    public void beginTurn() {
        this.cityCrew = curr_player.getCityCenter();
    }

    public void endTurn() {
        if(curr_player == getPlayers(0)){
            curr_player = getPlayers(1);
        }else{
            curr_player = getPlayers(0);
            CalculateInterest();
            turn++;
        }
    }
    private Player checkWinner() {
        if(getPlayers(0).getBudget() == 0)
            return getPlayers(1);
        else if(getPlayers(1).getBudget() == 0)
            return getPlayers(0);
        if(getPlayers(0).getCityCenter() == null)
            return getPlayers(1);
        else if(getPlayers(1).getCityCenter() == null)
            return getPlayers(0);
        return null;
    }

    @Override
    public long getRandom() {
        Random ran = new Random();
        return ran.nextInt(100);
    }

    private void evaluatePlan(String plan){
        Parser parser = new GameParser(new ExprTokenizer(plan));
        List<Node.Exec> nodes = parser.Parse();
        if(turn %2 == 0){
            if(Plan2 == null) Plan2 = plan;
            else if(!Plan2.equals(plan)) {
                curr_player.updateBudget(-GameSetup.getRev_Cost());
                Plan2 = plan;
            }
        }else{
            if(Plan1 == null) Plan1 = plan;
            else if(!Plan1.equals(plan)) {
                curr_player.updateBudget(-GameSetup.getRev_Cost());
                Plan1 = plan;
            }
        }
        for(Node.Exec node : nodes){
            node.execute(this);
        }
    }
    @Override
    public Map<String, Long> getIdentifiers() {
        return curr_player.getIdentifiers();
    }

}
