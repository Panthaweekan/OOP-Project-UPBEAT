package GameConfig;

import GameConfig.Region.Region;

import java.util.List;
import java.util.Map;

public interface GameCommand {
    
    boolean attack(Direction dir, long v);
    boolean collect(long v);
    boolean invest(long eval);
    boolean relocate();
    long nearby(Direction dir);
    boolean move(Direction dir);
    long opponent();
    long getRow();
    long getCol();
    long getCityCrew_Row();
    long getCityCrew_Col();
    long getBudget();
    long getDep();
    long getInterest();
    long getMax_dep();
    long getRandom();
    List<Region> getTerritory();
    Region getRegion(int location);
    Region getCityCrew();
    Map<String, Long> getIdentifiers();
}
