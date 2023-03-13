package AST.Statement;

import GameConfig.GameCommand;
import AST.Node.*;

public class InvestNode extends Exec {
    private final Expr expr;

    public InvestNode(Expr expr) {
        this.expr = expr;
    }

    @Override
    public Exec execute(GameCommand gamecmd) {
        gamecmd.collect(expr.eval(gamecmd));
        return next;
    }
}