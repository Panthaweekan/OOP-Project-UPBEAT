package AST.Statement;

import GameConfig.GameCommand;

import static AST.Node.*;

public class DoneNode extends Exec {
    @Override
    public boolean execute(GameCommand game) {
        return true;
    }
}