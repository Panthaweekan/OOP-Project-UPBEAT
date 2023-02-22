package AST.Expression;

import GameConfig.Direction;
import GameConfig.GameCommand;

import static AST.Node.*;

public class NearbyNode extends Expr {
    private final Direction dir;

    public NearbyNode(Direction dir) {
        this.dir = dir;
    }

    @Override
    public long eval(GameCommand gamecmd) {
        return gamecmd.nearby(dir);
    }

    @Override
    public String toString() {
        return "nearby " + dir;
    }
}