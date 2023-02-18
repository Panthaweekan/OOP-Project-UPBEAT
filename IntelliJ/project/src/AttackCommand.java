public abstract class AttackCommand extends ActionCommand {
    private final Direction direction;
    private final Expression expression;

    public AttackCommand(Direction direction, Expression expression) {
        this.direction = direction;
        this.expression = expression;
    }

    public Direction getDirection() {
        return direction;
    }

    public Expression getExpression() {
        return expression;
    }
}