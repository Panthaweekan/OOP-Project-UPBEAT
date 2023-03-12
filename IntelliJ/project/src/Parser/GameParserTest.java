package Parser;

import static AST.Node.Exec;

import Tokenizer.ExprTokenizer;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.*;
import static Parser.ParserException.*;

public class GameParserTest {
    public GameParser parser;
    public Exec node;

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
        Path fileName = Path.of("OOP-Project-UPBEAT/IntelliJ/project/src/Parser/TestFiles/Constructor_plan");
        String str = Files.readString(fileName);
        parser = new GameParser((new ExprTokenizer(str)));
        assertDoesNotThrow(() -> parser.Parse());
    }
}