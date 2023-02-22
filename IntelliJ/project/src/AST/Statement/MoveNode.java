package AST.Statement;

import GameConfig.GameCommand;
import GameConfig.Direction;

import static AST.Node.*;

public class MoveNode extends Exec {
    private final Direction direction;

    public MoveNode(Direction direction) {
        this.direction = direction;
    }

    @Override
    public Exec execute(GameCommand gamecmd) {
        gamecmd.move(direction);
        return next;
    }
}