package AST.Statement;

public abstract class Exception_AST extends RuntimeException {
    protected Exception_AST() {
        super();
    }

    protected Exception_AST(String m) {
        super(m);
    }

    public static class UnExceptTokenException extends Exception_AST {
        public UnExceptTokenException(String token) {
            super("UnExcepted Token >> " + token);
        }
    }

    public static class UnknownOperator extends Exception_AST {
        public UnknownOperator(String op) {
            super(String.format("%s isn't a operator", op));
        }
    }

    public static class UndefinedIdentifier extends Exception_AST {
        public UndefinedIdentifier(String iden) {
            super(String.format("identifer '%s' is not defined", iden));
        }
    }

    public static class IntegerRequired extends Exception_AST {
        public IntegerRequired(String iden) {
            super(String.format("integer required instead of '%s' ", iden));
        }
    }
}