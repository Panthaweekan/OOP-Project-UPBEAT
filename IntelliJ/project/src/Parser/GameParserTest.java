package Parser;

import static AST.Node.Exec;

import AST.Statement.AssignmentNode;
import Tokenizer.ExprTokenizer;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static Parser.ParserException.*;

public class GameParserTest {
    public GameParser parser;
    public List<Exec> node;

    @Test
    public void testExpression() {
        parser = new GameParser(new ExprTokenizer("123+321-213"));
        assertThrows(NoSuchCommand.class, parser::Parse);
    }
    @Test
    public void testNoStatement() {
        assertThrows(NeedStatement.class, () -> new GameParser(new ExprTokenizer(null)));
        assertThrows(NeedStatement.class, () -> new GameParser(new ExprTokenizer("")));
    }

    @Test
    public void testStatements(){
        parser = new GameParser(new ExprTokenizer("a = 1 b = 2 c = 3 d = 4 e = 5"));
        node = parser.Parse();
        assertInstanceOf(AssignmentNode.class, node.get(0));
        assertInstanceOf(AssignmentNode.class, node.get(1));
        assertInstanceOf(AssignmentNode.class, node.get(2));
        assertInstanceOf(AssignmentNode.class, node.get(3));
        assertInstanceOf(AssignmentNode.class, node.get(4));
    }

    @Test
    public void testUnknownWord() {
        parser = new GameParser(new ExprTokenizer("Watch this! pew pew pew!"));
        assertThrows(NoSuchCommand.class, parser::Parse);
    }
    @Test
    public void testSpecWord() {
        parser = new GameParser(new ExprTokenizer("nearby=10000000"));
        assertThrows(specVarIdentifier.class, parser::Parse);
    }

    @Test
    public void testReadFile() throws IOException {
        Path fileName = Path.of("OOP-Project-UPBEAT/IntelliJ/project/src/Parser/TestFiles/Construction_plan.txt");
        String str = Files.readString(fileName);
        parser = new GameParser((new ExprTokenizer(str)));
        assertDoesNotThrow(() -> parser.Parse());
    }
}