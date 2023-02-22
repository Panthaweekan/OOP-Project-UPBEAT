package Parser;

public abstract class ParserException extends RuntimeException {
    protected ParserException(String m) {
        super(String.format("%s", m));
    }

    public static class NoSuchCommand extends ParserException {
        public NoSuchCommand(String cmd) {
            super(String.format("This cmd -> '%s' not found!!!", cmd));
        }
    }

    public static class NotImplemented extends ParserException {
        public NotImplemented(String cmd) {
            super(String.format("This cmd -> '%s' not implemented!!!", cmd));
        }
    }

    public static class InvalidDirection extends ParserException {
        public InvalidDirection(String dir) {
            super(String.format("invalid-direction ->'%s'!!!", dir));
        }
    }

    public static class InvalidInfoExpression extends ParserException {
        public InvalidInfoExpression(String exr) {
            super(String.format("invalid info-expression -> '%s'!!!", exr));
        }
    }

    public static class specVarIdentifier extends ParserException {
        public specVarIdentifier(String iden) {
            super(String.format("spec-Var identifier -> '%s'!!!", iden));
        }
    }
    
    public static class NeedStatement extends ParserException {
        public NeedStatement() {
            super("at least one statement required!!!");
        }
    }
}