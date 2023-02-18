public class AssignmentStatement extends Command {
    private String variable;
    private Expression expression;
  
    public AssignmentStatement(String variable, Expression expression) {
      this.variable = variable;
      this.expression = expression;
    }
  
    public String getVariable() {
      return variable;
    }
  
    public Expression getExpression() {
      return expression;
    }
  }
  