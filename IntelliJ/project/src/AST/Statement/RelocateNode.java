package AST.Statement;

import GameConfig.GameCommand;

import static AST.Node.*;

public class RelocateNode extends Exec {
    @Override
    public Exec execute(GameCommand gamecmd) {
        gamecmd.relocate();
        return null;
    }
}