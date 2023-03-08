package GameConfig;

import GameConfig.Player.GamePlayer;
import GameConfig.Player.Player;
import GameConfig.Region.Region;

import java.util.List;
import java.util.Map;

public class GamePlay implements GameCommand{

    private final GamePlayer p1, p2;
    private final List<Region> territory;
    private final long Cost = 1;

    private Player curr_player;
    private Region cityCrew;
    private int turn;

    public GamePlay(GamePlayer p1, GamePlayer p2, List<Region> territory) {
        this.territory = territory;
        this.p1 = p1;
        this.p2 = p2;
        this.curr_player = this.p1;
        this.turn = 1;
    }

    @Override
    public void attack(Direction dir, long v) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void collect(long v) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void invest(long eval) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void relocate() {
        // TODO Auto-generated method stub
        
    }

    @Override
    public long nearby(Direction dir) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public void move(Direction dir) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public long opponent() {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public Map<String, Long> getIdentifiers() {
        // TODO Auto-generated method stub
        return null;
    }
    
}
