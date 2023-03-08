package AST.Statement;

import AST.Node.*;
import GameConfig.GameCommand;

public class If_ElseNode extends Exec {
    protected final Expr condition;
    protected Exec trueNode;
    protected Exec falseNode;

    public If_ElseNode(Expr condition, Exec trueNode, Exec falseNode) {
        this.condition = condition;
        this.trueNode = trueNode;
        this.falseNode = falseNode;
    }

    @Override
    public boolean execute(GameCommand gamecmd) {
        trueNode.next = next;
        falseNode.next = next;
        if(condition.eval(gamecmd) > 0){
            return trueNode.execute(gamecmd);
        } else {
            return falseNode.execute(gamecmd);
        }
    }
}