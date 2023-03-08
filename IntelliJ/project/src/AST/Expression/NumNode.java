package AST.Expression;

import AST.Node.Expr;
import GameConfig.GameCommand;

public class NumNode extends Expr {
    private final long value;

    public NumNode(long value) {
        this.value = value;
    }

    @Override
    public long eval(GameCommand game) {
        return value;
    }

    public long eval() {
        return value;
    }

    @Override
    public String toString(){
        return String.valueOf(value);
    }
}
