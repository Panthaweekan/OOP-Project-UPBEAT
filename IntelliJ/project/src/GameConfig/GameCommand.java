package GameConfig;

import java.util.Map;

public interface GameCommand {
    
    void attack(Direction dir, long v);

    void collect(long v);

    void invest(long eval);

    void relocate();

    long nearby(Direction dir);

    void move(Direction dir);

    long opponent();
    
    Map<String, Long> getIdentifiers();
}
