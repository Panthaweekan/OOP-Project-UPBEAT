package Tokenizer;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

// used in IntelliJ to Test!

public class TokenizerTest {
    private ExprTokenizer tkz;

    @Test
    public void testHasNext() {
        tkz = new ExprTokenizer(null);
        assertFalse(tkz.hasNext());
        tkz = new ExprTokenizer("");
        assertFalse(tkz.hasNext());
        tkz = new ExprTokenizer("Hi");
        assertTrue(tkz.hasNext());
    }

    @Test
    public void testPeek() {
        tkz = new ExprTokenizer(null);
        assertThrows(TokenException.NoMoreToken.class, tkz::peek);
        tkz = new ExprTokenizer("");
        assertThrows(TokenException.NoMoreToken.class, tkz::peek);
        tkz = new ExprTokenizer("Hi");
        assertEquals("Hi", tkz.peek());
    }

    @Test
    public void testPeekString() {
        tkz = new ExprTokenizer(null);
        assertFalse(tkz.peek(""));
        assertFalse(tkz.peek("Hi"));
        tkz = new ExprTokenizer("");
        assertFalse(tkz.peek(""));
        assertFalse(tkz.peek("Hi"));
        tkz = new ExprTokenizer("Hi");
        assertTrue(tkz.peek("Hi"));
        tkz = new ExprTokenizer("Hello World");
        assertFalse(tkz.peek("Hi"));
        assertTrue(tkz.peek("Hello"));
    }

    @Test
    public void testConsume() {
        tkz = new ExprTokenizer(null);
        assertThrows(TokenException.NoMoreToken.class, tkz::consume);
        tkz = new ExprTokenizer("");
        assertThrows(TokenException.NoMoreToken.class, tkz::consume);
        tkz = new ExprTokenizer("Hi");
        assertEquals("Hi", tkz.consume());
    }

    @Test
    public void testConsumeString() {
        tkz = new ExprTokenizer(null);
        assertThrows(TokenException.NoMoreToken.class, () -> tkz.consume(""));
        assertThrows(TokenException.NoMoreToken.class, () -> tkz.consume("hi"));
        tkz = new ExprTokenizer("");
        assertThrows(TokenException.NoMoreToken.class, () -> tkz.consume(""));
        assertThrows(TokenException.NoMoreToken.class, () -> tkz.consume("hi"));
        tkz = new ExprTokenizer("hi");
        assertTrue(tkz.consume("hi"));
        tkz = new ExprTokenizer("hi");
        assertFalse(tkz.consume("hello"));
        assertTrue(tkz.consume("hi"));
        tkz = new ExprTokenizer("hello");
        assertFalse(tkz.consume("hi"));
        assertTrue(tkz.consume("hello"));
    }

    @Test
    public void testComment() {
        tkz = new ExprTokenizer("# Hello World \n Whatsup \n ###########");
        assertTrue(tkz.consume("Whatsup"));
    }
}