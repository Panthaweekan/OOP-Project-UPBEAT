package GameConfig;

import AST.Statement.Exception_AST;

public abstract class GameException extends RuntimeException {

    public static class InvalidValue extends Exception_AST {
        public InvalidValue(long m) {
            super(String.format("Invalid value >> '%d'", m));
        }

    }
}