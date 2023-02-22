package AST.Statement;

import GameConfig.GameCommand;
import GameConfig.Direction;

import static AST.Node.*;

public class AttackNode extends Exec {
    private final Expr expression;
    private final Direction direction;

    public AttackNode(Expr expression, Direction direction) {
        this.expression = expression;
        this.direction = direction;
    }

    @Override
    public Exec execute(GameCommand gamecmd) {
        gamecmd.attack(
                direction,
                expression.eval(gamecmd)
        );
        return next;
    }
}