package AST.Expression;

import AST.Node.*;
import AST.Statement.Exception_AST;
import GameConfig.GameCommand;

public class IdentifierNode extends Expr {
    private final String idf;
    public IdentifierNode(String idf) {
        this.idf = idf;
    }
    @Override
    public long eval(GameCommand game) {
        if(game.getIdentifiers().containsKey(idf)){
            return game.getIdentifiers().get(idf);
        }else{
            throw new Exception_AST.UndefinedIdentifier(idf);
        }
    }


    @Override
    public String toString(){
        return idf;
    }
}