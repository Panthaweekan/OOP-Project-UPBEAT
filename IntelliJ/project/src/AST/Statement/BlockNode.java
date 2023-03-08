package AST.Statement;

import AST.Node.Exec;
import GameConfig.GameCommand;

import java.util.List;

public class BlockNode extends Exec {
    private final List<Exec> nodes;

    public BlockNode(List<Exec> nodes) {
        this.nodes = nodes;
    }

    @Override
    public boolean execute(GameCommand command) {
        for(Exec node : nodes){
            if(!node.execute(command)) return false;
        }
        return true;
    }
}
