# Backend Branch!
work space!
- https://miro.com/app/board/uXjVPr34o4g=/
- https://docs.google.com/document/d/1dQThnNRY4VE0AUE6bmrtzr2TL25oGN1kzhiByPQ0Z7o/edit

git command for use in VScode Terminal
 - http://guides.beanstalkapp.com/version-control/common-git-commands.html

- Problem now!
  - How to implement Parser and Tokenizer for upbeat game style (50%)
  - How to used AST to help us created Correct Parser (50%)
  - need to know about Parser & Tokenizer more and more to make this game! (i know but not sure how to implement correctly)
  - How Evaluator work?
  - What construct plan look like? (I'm not sure about Sample construct plan in Teacher's documentation
  
 date. ; FEB/18/2023
 
# Tomorrow Plan
Tokenizer must done and Parser must be implemented (not all methods)

# Sample
while (deposit) {
  if (deposit - 100)
  then collect (deposit / 4)
  else if (budget - 25) then invest 25
  else {}
}

# AST (Blame view)

Program
   |
   +-- StatementList
         |
         +-- BlockStatement
         |     |
         |     +-- StatementList
         |     |     |
         |     |     +-- AssignmentStatement
         |     |     |     |
         |     |     |     +-- Identifier (name: x)
         |     |     |     |
         |     |     |     +-- AddExpression
         |     |     |           |
         |     |     |           +-- Identifier (name: y)
         |     |     |           |
         |     |     |           +-- MultiplyExpression
         |     |     |                 |
         |     |     |                 +-- NumberLiteral (value: 2)
         |     |     |                 |
         |     |     |                 +-- Identifier (name: z)
         |     |     |
         |     |     +-- RegionCommand (command: invest)
         |     |           |
         |     |           +-- NumberLiteral (value: 100)
         |     |
         |     +-- IfStatement
         |           |
         |           +-- LessThanExpression
         |           |     |
         |           |     +-- Identifier (name: x)
         |           |     |
         |           |     +-- NumberLiteral (value: 10)
         |           |
         |           +-- BlockStatement (thenBlock)
         |           |     |
         |           |     +-- StatementList
         |           |           |
         |           |           +-- RegionCommand (command: collect)
         |           |                 |
         |           |                 +-- DivideExpression
         |           |                       |
         |           |                       +-- Identifier (name: y)
         |           |                       |
         |           |                       +-- NumberLiteral (value: 4)
         |           |
         |           +-- BlockStatement (elseBlock)
         |                 |
         |                 +-- StatementList
         |                       |
         |                       +-- AttackCommand (command: shoot)
         |                             |
         |                             +-- Direction (direction: upleft)
         |                             |
         |                             +-- NumberLiteral (value: 1000)
         |
         +-- WhileStatement
               |
               +-- GreaterThanExpression
               |     |
               |     +-- Identifier (name: x)
               |     |
               |     +-- NumberLiteral (value: 0)
               |
               +-- BlockStatement (loopBlock)
                     |
                     +-- StatementList
                           |
                           +-- MoveCommand (command: move)
                                 |
                                 +-- Direction (direction: upright)
