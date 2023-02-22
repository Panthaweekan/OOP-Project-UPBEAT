package AST.Statement;

import GameConfig.GameCommand;

import static AST.Node.*;

public class DoneNode extends Exec {
    @Override
    public Exec execute(GameCommand game) {
        return null;
    }
}