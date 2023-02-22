package AST.Statement;

import GameConfig.GameCommand;

public class WhileNode extends If_ElseNode {
    private int executionCount = 0;

    public WhileNode(Expr expression, Exec statements) {
        super(expression, statements, null);
        if (trueNode == null)
            trueNode = this;
    }

    private Exec getLastNode(Exec node) {
        while (node != this && node != null) {
            if (node.next == this || node.next == null) return node;
            node = node.next;
        }
        return this;
    }

    @Override
    public Exec execute(GameCommand gamecmd) {
        if (super.condition.eval(gamecmd) > 0) {
            if (executionCount >= 10000)
                return next;
            Exec last = getLastNode(trueNode);
            if (last != this)
                last.next = this;
            executionCount++;
            return trueNode;
        }
        return next;
    }
}