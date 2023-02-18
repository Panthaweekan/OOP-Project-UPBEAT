import java.util.HashMap;

public class ArithmeticExpression extends Expression {
    private final Expression left;
    private final ArithmeticOperator operator;
    private final Expression right;

    public ArithmeticExpression(Expression left, ArithmeticOperator operator, Expression right) {
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

    @Override
    public long evaluate(HashMap<String, Long> state) throws ExecutionException {
        long leftValue = left.evaluate(state);
        long rightValue = right.evaluate(state);

        try {
            return operator.apply(leftValue, rightValue);
        } catch (ArithmeticException e) {
            throw new ExecutionException("Arithmetic error: " + e.getMessage());
        }
    }
}
