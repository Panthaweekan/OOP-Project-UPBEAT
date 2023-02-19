package AST;

import GameConfig.GameCommand;

public abstract class Node {
    public abstract static class Expr extends Node {

    
        public abstract long eval(GameCommand command);
        public abstract String toString();
    }

    public abstract static class Exec extends Node {
        
        public Exec next;
        public abstract Exec execute(GameCommand command);
    }
}