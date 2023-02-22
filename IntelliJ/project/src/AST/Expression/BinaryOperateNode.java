package AST.Expression;

import GameConfig.GameCommand;

import static AST.Node.*;
import static AST.Statement.Exception_AST.*;

public class BinaryOperateNode extends Expr {
    private final Expr left;
    private final Expr right;
    private final String operator;

    public BinaryOperateNode(Expr left, String operator, Expr right) {
        this.left = left;
        this.right = right;
        this.operator = operator;
    }

    public long eval(GameCommand gamecmd) {
        long leftValue = left.eval(gamecmd);
        long rightValue = right.eval(gamecmd);
        return switch (operator) {
            case "+" -> leftValue + rightValue;
            case "-" -> leftValue - rightValue;
            case "*" -> leftValue * rightValue;
            case "/" -> leftValue / rightValue;
            case "%" -> leftValue % rightValue;
            case "^" -> (long) Math.pow(leftValue, rightValue);
            default -> throw new UnknownOperator(operator);
        };
    }

    @Override
    public String toString() {
        return String.format("(%s %s %s)", left.toString(), operator, right.toString());
    }
}