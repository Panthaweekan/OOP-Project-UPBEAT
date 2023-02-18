import java.util.ArrayList;
import java.util.List;

public class PlanParser {
    private List<Token> tokens;
    private int pos;

    private static final String[] RESERVED_WORDS = {
        "collect", "done", "down", "downleft", "downright", "else",
        "if", "invest", "move", "nearby", "opponent", "relocate", "shoot",
        "then", "up", "upleft", "upright", "while"
    };

    public PlanParser(List<Token> tokens) {
        this.tokens = tokens;
        this.pos = 0;
    }

    public Plan parsePlan() throws ParseException {
        List<Statement> statements = new ArrayList<>();
        while (pos < tokens.size()) {
            statements.add(parseStatement());
        }
        return new Plan(statements);
    }

    private Statement parseStatement() throws ParseException {
        if (match(TokenType.KEYWORD, "if")) {
            return parseIfStatement();
        } else if (match(TokenType.KEYWORD, "while")) {
            return parseWhileStatement();
        } else if (match(TokenType.LEFT_BRACE)) {
            return parseBlockStatement();
        } else {
            return parseCommandStatement();
        }
    }

    private Statement parseCommandStatement() throws ParseException {
        if (match(TokenType.IDENTIFIER)) {
            String identifier = tokens.get(pos - 1).getText();
            if (match(TokenType.EQUAL)) {
                Expression expression = parseExpression();
                return new AssignmentStatement(identifier, expression);
            } else if (match(TokenType.KEYWORD, "done")) {
                return new ActionCommandStatement(ActionCommandType.DONE);
            } else if (match(TokenType.KEYWORD, "relocate")) {
                return new ActionCommandStatement(ActionCommandType.RELOCATE);
            } else if (match(TokenType.KEYWORD, "move")) {
                Direction direction = parseDirection();
                return new MoveCommandStatement(direction);
            } else if (match(TokenType.KEYWORD, "invest")) {
                Expression expression = parseExpression();
                return new RegionCommandStatement(RegionCommandType.INVEST, expression);
            } else if (match(TokenType.KEYWORD, "collect")) {
                Expression expression = parseExpression();
                return new RegionCommandStatement(RegionCommandType.COLLECT, expression);
            } else if (match(TokenType.KEYWORD, "shoot")) {
                Direction direction = parseDirection();
                Expression expression = parseExpression();
                return new AttackCommandStatement(direction, expression);
            }
        }
        throw new ParseException("Expecting a command statement");
    }

    private IfStatement parseIfStatement() throws ParseException {
        expect(TokenType.LEFT_PAREN);
        Expression condition = parseExpression();
        expect(TokenType.RIGHT_PAREN);
        Statement thenStatement = parseStatement();
        expect(TokenType.KEYWORD, "else");
        Statement elseStatement = parseStatement();
        return new IfStatement(condition, thenStatement, elseStatement);
    }

    private WhileStatement parseWhileStatement() throws ParseException {
        expect(TokenType.LEFT_PAREN);
        Expression condition = parseExpression();
        expect(TokenType.RIGHT_PAREN);
        Statement body = parseStatement();
        return new WhileStatement(condition, body);
    }

    private BlockStatement parseBlockStatement() throws ParseException {
        List<Statement> statements = new ArrayList<>();
        while (!match(TokenType.RIGHT_BRACE)) {
            statements.add(parseStatement());
        }
        return new BlockStatement(statements);
    }

    private Direction parseDirection() throws ParseException {
        if (match(TokenType.KEYWORD, "up")) {
            if (match(TokenType.KEYWORD, "left")) {
                return Direction.UP_LEFT;
            } else if (match(TokenType.KEYWORD, "
