package AST.Statement;

import GameConfig.GameCommand;
import AST.Node.*;

public class CollectNode extends Exec {
    private final Expr expr;

    public CollectNode(Expr expr) {
        this.expr = expr;
    }

    @Override
    public boolean execute(GameCommand gamecmd) {
        return gamecmd.collect(expr.eval(gamecmd));
    }
}