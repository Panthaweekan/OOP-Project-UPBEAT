package Parser;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import AST.Expression.*;
import AST.Statement.*;
import AST.Node.*;
import AST.Statement.Exception_AST.*;
import GameConfig.Direction;
import Parser.ParserException.*;
import Tokenizer.ExprTokenizer;

public class GameParser implements Parser {

    private final ExprTokenizer tkz;
    private final List<String> Allcommand = Arrays.asList("done" , "relocate" , "move" , "invest" , "collect" , "shoot");
    private final List<String> specVar = Arrays.asList("if", "while", "done", "relocate", "move", "invest", "shoot"
    , "up", "down", "upleft", "upright", "downleft", "downright", "if", "while", "then", "else", "opponent", "nearby",
    "rows", "cols", "currow", "curcol", "budget", "deposit", "int", "maxdeposit", "random");

    public GameParser(ExprTokenizer tkz){
        if(!tkz.hasNext()){
            throw new NeedStatement();
        }
        this.tkz = tkz;
    }

    /** Renew List<Exec> to Exec **/
    @Override
    public List<Exec> Parse() {     // parse to linked-list instead of Create my own Linked-list (From Last FeedBack)
        List<Exec> nodes = parsePlan();
        if(tkz.hasNext()){
            throw new UnExceptTokenException(tkz.peek());
        }
        return nodes;
    }

    private List<Exec> parsePlan(){
        List<Exec> plan = new ArrayList<>();
        plan.add(parseStatement());
        parseManyStatement(plan);
        return plan;
    }

    private Exec parseStatement() {
        if(tkz.peek("if")){
            return parseIfStatement();
        }else if(tkz.peek("while")){
            return parseWhileStatement();
        }else if(tkz.peek("{")){
            return parseBlockStatement();
        }else{
            return parseCommand();
        }
    }

    /** Multiple Statement **/
    private void parseManyStatement(List<Exec> l){
        while(tkz.hasNext() && !tkz.peek("}")) {
            l.add(parseStatement());
        }
    }

    private Exec parseBlockStatement() {
        List<Exec> block = new ArrayList<>();
        tkz.consume("{");
        parseManyStatement(block);
        tkz.consume("}");
        return new BlockNode(block);
    }

    private Exec parseWhileStatement() {
        tkz.consume("while");
        tkz.consume("{");
        Expr expr = parseExpression();
        tkz.consume("}");
        Exec parse = parseStatement();
        return new WhileNode(expr, parse); // WhileNode on AST!
    }


    private Exec parseIfStatement() {
        tkz.consume("if");
        tkz.consume("(");
        Expr expr = parseExpression();
        tkz.consume(")");
        tkz.consume("then");
        Exec trueState = parseStatement();
        tkz.consume("else");
        Exec falseState= parseStatement();
        return new If_ElseNode(expr, trueState, falseState); // IfElseNode on AST!
    }

    private Exec parseCommand() {
        if (Allcommand.contains(tkz.peek()))
            return parseActionCommand();
        else
            return parseAssignmentStatement();
    }

    private Exec parseAssignmentStatement() {
        String identifier = tkz.consume();
        if (specVar.contains(identifier))
            throw new specVarIdentifier(identifier);
        if (tkz.peek("="))
            tkz.consume();
        else
            throw new NoSuchCommand(identifier);
        Expr expr= parseExpression();
        return new AssignmentNode(identifier, expr); // AssignmentNode on AST!
    }

    private Exec parseActionCommand() {
        String command = tkz.consume();
        return switch (command) {
            case "done" -> new DoneNode(); 
            case "relocate" -> new RelocateNode();
            case "move" -> parseMoveCommand();
            case "invest" -> parseInvestCommand();
            case "collect" -> parseCollectCommand();
            case "shoot" -> parseShootCommand();
            default -> throw new NotImplemented(command);
        };
    }

    private Exec parseShootCommand() {
        Direction dir = parseDirection();
        Expr expr = parseExpression();
        return new AttackNode(expr,dir); // AttackNode on AST!
    }

    private Direction parseDirection() {
        String direction = tkz.consume();
        return switch (direction) {
            case "up" -> Direction.Up;
            case "down" -> Direction.Down;
            case "upleft" -> Direction.UpLeft;
            case "upright" -> Direction.UpRight;
            case "downleft" -> Direction.DownLeft;
            case "downright" -> Direction.DownRight;
            default -> throw new InvalidDirection(direction);
        };
    }

    private Exec parseCollectCommand() {
        Expr expr = parseExpression();
        return new CollectNode(expr); // CollectNode on AST!
    }

    private Exec parseInvestCommand() {
        Expr expr = parseExpression();
        return new InvestNode(expr); // InvestNode on AST!
    }

    private Expr parseExpression() {
        Expr left = parseT();
        while (tkz.peek("+") || tkz.peek("-")) {
            String operator = tkz.consume();
            Expr right = parseT();
            left = new BinaryOperateNode(left, operator, right); // BinaryOptNode on AST!
        }
        return left;
    }

    private Expr parseT() {
        Expr left = parseF();
        while (tkz.peek("*") || tkz.peek("/") || tkz.peek("%")) {
            String operator = tkz.consume();
            Expr right = parseF();
            left = new BinaryOperateNode(left, operator, right); // BinaryOptNode on AST!
        }
        return left;
    }
    private Expr parseF() {
        Expr left = parsePower();
        if (tkz.peek("^")) {    // Fixed : (wrong associativity from last FeedBack)
            String operator = tkz.consume();
            Expr right = parseF();
            left = new BinaryOperateNode(left, operator, right); // BinaryOptNode on AST!
        }
        return left;
    }

    private Expr parsePower() {
        if (Character.isDigit(tkz.peek().charAt(0))) {
            return new NumNode(Long.parseLong(tkz.consume())); // NumNode on AST!
        } else if (tkz.peek("opponent") || tkz.peek("nearby")) {
            return parseInfoExpression();
        } else if (tkz.peek("(")) {
            tkz.consume("(");
            Expr expr = parseExpression();
            tkz.consume(")");
            return expr;
        }else if(Character.isAlphabetic(tkz.peek().charAt(0)) ){
            return new IdentifierNode( tkz.consume() );
        }
        return null;
    }
    private Expr parseInfoExpression() {
        if (tkz.peek("opponent")) {
            tkz.consume();
            return new OpponentNode();          // EnemyNode on AST!
        } else if (tkz.peek("nearby")) {
            tkz.consume();
            Direction direction = parseDirection();
            return new NearbyNode(direction);   // NearbyNode on AST
        } else {
            throw new InvalidInfoExpression(tkz.peek());
        }
    }

    private Exec parseMoveCommand() {
        Direction direction = parseDirection();
        return new MoveNode(direction); // MoveNode on AST!
    }
}

