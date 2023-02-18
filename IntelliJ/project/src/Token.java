import java.util.List;
    public class PlanTokenizer {
        private String input;
        private int pos;
        private static final String[] RESERVED_WORDS = {
            "collect", "done", "down", "downleft", "downright", "else",
            "if", "invest", "move", "nearby", "opponent", "relocate", "shoot",
            "then", "up", "upleft", "upright", "while"
        };
        public PlanTokenizer(String input) {
            this.input = input;
            this.pos = 0;
        }
        
        public List<Token> tokenize() throws ParseException {
            List<Token> tokens = new ArrayList<>();
            while (pos < input.length()) {
                char c = input.charAt(pos);
                if (Character.isDigit(c)) {
                    tokens.add(parseNumber());
                } else if (Character.isLetter(c)) {
                    tokens.add(parseIdentifierOrKeyword());
                } else if (c == '+') {
                    tokens.add(new Token(TokenType.PLUS, "+"));
                    pos++;
                } else if (c == '-') {
                    tokens.add(new Token(TokenType.MINUS, "-"));
                    pos++;
                } else if (c == '*') {
                    tokens.add(new Token(TokenType.TIMES, "*"));
                    pos++;
                } else if (c == '/') {
                    tokens.add(new Token(TokenType.DIVIDE, "/"));
                    pos++;
                } else if (c == '%') {
                    tokens.add(new Token(TokenType.MODULO, "%"));
                    pos++;
                } else if (c == '=') {
                    tokens.add(new Token(TokenType.EQUAL, "="));
                    pos++;
                } else if (c == '^') {
                    tokens.add(new Token(TokenType.CARET, "^"));
                    pos++;
                } else if (c == '(') {
                    tokens.add(new Token(TokenType.LEFT_PAREN, "("));
                    pos++;
                } else if (c == ')') {
                    tokens.add(new Token(TokenType.RIGHT_PAREN, ")"));
                    pos++;
                } else if (c == '{') {
                    tokens.add(new Token(TokenType.LEFT_BRACE, "{"));
                    pos++;
                } else if (c == '}') {
                    tokens.add(new Token(TokenType.RIGHT_BRACE, "}"));
                    pos++;
                } else if (Character.isWhitespace(c)) {
                    pos++;
                } else {
                    throw new ParseException("Invalid character: " + c);
                }
            }
            return tokens;
        }
        
        private Token parseNumber() {
            int start = pos;
            while (pos < input.length() && Character.isDigit(input.charAt(pos))) {
                pos++;
            }
            String text = input.substring(start, pos);
            return new Token(TokenType.NUMBER, text);
        }
        
        private Token parseIdentifierOrKeyword() {
            int start = pos;
            while (pos < input.length() && (Character.isLetterOrDigit(input.charAt(pos)) || input.charAt(pos) == '_')) {
                pos++;
            }
            String text = input.substring(start, pos);
            if (isReservedWord(text)) {
                return new Token(TokenType.KEYWORD, text);
            } else {
                return new Token(TokenType.IDENTIFIER, text);
            }
        }
        
        private boolean isReservedWord(String text) {
            for (String word : RESERVED_WORDS) {
                if (word.equals(text)) {
                    return true;
                }
            }
            return false;
        }
    }
}