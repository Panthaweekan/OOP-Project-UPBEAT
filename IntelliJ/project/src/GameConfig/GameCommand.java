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
    List<Region> getTerritory();
    Region getRegion(int location);
    Region getCityCrew();
    long getBudget();
    Map<String, Long> getIdentifiers();
}
