package GameConfig;

import GameConfig.Player.Player;
import GameConfig.Region.Region;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GameState implements GameCommand{
    private final Player p1, p2;
    private final List<Region> territory;
    private final long Cost = 1;
    private Player curr_player;
    private Region cityCrew;
    private int turn;

    public GameState(Player p1, Player p2, List<Region> territory) {
        this.territory = territory;
        this.p1 = p1;
        this.p2 = p2;
        this.curr_player = this.p1;
        this.turn = 1;
    }
    private boolean checkBudget() {
        return curr_player.getBudget() >= Cost;
    }

    @Override
    public boolean attack(Direction dir, long v) {
        // TODO Auto-generated method stub
        if(checkBudget()) {
            curr_player.updateBudget(-Cost);
            if(curr_player.getBudget() < v || v < 0) return false;
            int location = move(dir, cityCrew.getLocation(), cityCrew.getCol());
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

    public int move(Direction dir, int location , int col){
        int column = (int) GameSetup.getCols();
        switch (dir) {
            case Up -> location -= column;
            case Down -> location += column;
            case UpLeft -> {
                if(col == 1) location = -1;
                else {
                    if (col % 2 == 0) location -= (column + 1);
                    else location--;
                }
            }
            case UpRight -> {
                if(col == column) location = -1;
                else {
                    if (col % 2 == 0) location += 1 - column;
                    else location++;
                }
            }
            case DownLeft -> {
                if(col == 1) location = -1;
                else {
                    if (col % 2 == 0) location--;
                    else location += column - 1;
                }
            }
            case DownRight -> {
                if(col == column) location = -1;
                else {
                    if (col % 2 == 0) location++;
                    else location += column + 1;
                }
            }
        }
        if(location < 0 || location >= territory.size()) return -1;
        else return location;
    }

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

    @Override
    public boolean invest(long v) {
        if(checkBudget()) {
            long invested = cityCrew.getDeposit();
            long max_dep = GameSetup.getMaxDeposit();
            curr_player.updateBudget(-Cost);
            int check;
            int count = 0;
            if(cityCrew.getOwner()!= curr_player) {
                for (int i = 0; i < 6; i++) {
                    check = move(Direction.values()[i], cityCrew.getLocation(), cityCrew.getCol());
                    if (check == -1) {
                        count++;
                        continue;
                    }
                    if (territory.get(check).getOwner() != curr_player) count++;
                }
                if (count == 6) return false;
            }
            if(curr_player.getBudget() < v || v <= 0) return false;
            if(cityCrew.getOwner() != null && cityCrew.getOwner() != curr_player) return false;
            if(invested == max_dep) return false;
            if(invested + v > max_dep){
                long invest = max_dep - invested;
                cityCrew.updateDeposit(invest);
                curr_player.updateBudget(-invest);
            }else {
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
        // TODO Auto-generated method stub
        return false; // Don't know how to get the Shortest-path
    }

    @Override
    public long nearby(Direction dir) {
        long distance = 0;
        int location = move(dir, cityCrew.getLocation(), cityCrew.getCol());
        Region targetRegion;
        while (location != -1) {
            targetRegion = territory.get(location);
            distance++;
            if (targetRegion.getOwner() != null && targetRegion.getOwner() != curr_player)
                return ((distance) * 100 + (long) (Math.log10(targetRegion.getDeposit())) + 1);
            location = move(dir, targetRegion.getLocation(), targetRegion.getCol());
        }
        return 0L;
    }

    @Override
    public boolean move(Direction dir) {
        if(checkBudget()) {
            curr_player.updateBudget(-Cost);
            int location = move(dir, cityCrew.getLocation(), cityCrew.getCol());
            if(location == -1) return false;
            if(territory.get(location).getOwner() != null && territory.get(location).getOwner() != curr_player) return false;
            cityCrew = territory.get(location);
            return true;
        }
        return false;
    }

    @Override
    public long opponent() {
        // TODO Auto-generated method stub
        return 0;
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
    public Map<String, Long> getIdentifiers() {
        // TODO Auto-generated method stub
        return null;
    }

}
