public abstract class RegionCommand extends ActionCommand {
    private final RegionCommandType type;
    private final Expression expression;

    public RegionCommand(RegionCommandType type, Expression expression) {
        this.type = type;
        this.expression = expression;
    }

    public RegionCommandType getType() {
        return type;
    }

    public Expression getExpression() {
        return expression;
    }
}