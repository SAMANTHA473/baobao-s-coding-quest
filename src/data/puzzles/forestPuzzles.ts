import { Puzzle } from './types';

export const forestPuzzles: Puzzle[] = [
  {
    id: 1,
    level: 1,
    location: 'forest',
    title: 'What is a Bug?',
    description: 'What is a "bug" in programming?',
    code: `// In programming, we often encounter "bugs"
// But what exactly is a bug?`,
    options: [
      'A tiny insect',
      'An error in code',
      'A feature',
      'A type of variable',
    ],
    correctAnswer: 1,
    hint: 'Think about what goes wrong when code doesn\'t work...',
    explanation: 'A bug in programming is an error in code that causes it to behave unexpectedly or incorrectly.',
  },
  {
    id: 2,
    level: 2,
    location: 'forest',
    title: 'End of Line',
    description: 'Which symbol is often used to end a line of code in many programming languages?',
    code: `// Many programming languages use a special
// symbol to mark the end of a statement
let x = 5___`,
    options: [
      'Period (.)',
      'Semicolon (;)',
      'Comma (,)',
      'Question mark (?)',
    ],
    correctAnswer: 1,
    hint: 'It looks like a period with a comma underneath...',
    explanation: 'The semicolon (;) is commonly used to end statements in languages like JavaScript, Java, C, and more.',
  },
  {
    id: 3,
    level: 3,
    location: 'forest',
    title: 'Debugging Defined',
    description: 'What does "debugging" mean?',
    code: `// A programmer found a problem in their code
// They need to "debug" it. What does that mean?`,
    options: [
      'Adding more bugs',
      'Finding and fixing errors',
      'Writing new code',
      'Deleting a program',
    ],
    correctAnswer: 1,
    hint: 'Think about what you do to get rid of bugs...',
    explanation: 'Debugging means finding and fixing errors (bugs) in your code to make it work correctly.',
  },
  {
    id: 4,
    level: 4,
    location: 'forest',
    title: 'Printing Text',
    description: 'Which of these is a common way to print text in Python?',
    code: `# In Python, we want to display "Hello World"
# Which function should we use?

___("Hello World")`,
    options: [
      'echo()',
      'print()',
      'say()',
      'write()',
    ],
    correctAnswer: 1,
    hint: 'The function name describes what it does - showing output...',
    explanation: 'In Python, print() is the built-in function used to display text and values on the screen.',
  },
  {
    id: 5,
    level: 5,
    location: 'forest',
    title: 'Variable Basics',
    description: 'What is a variable in programming?',
    code: `// Variables are fundamental in programming
let myAge = 10;
let myName = "BaoBao";`,
    options: [
      'A type of bug',
      'A container for storing data',
      'A programming language',
      'A computer part',
    ],
    correctAnswer: 1,
    hint: 'Think of it like a labeled box that holds something...',
    explanation: 'A variable is a container for storing data values. It has a name and holds information you can use and change.',
  },
  {
    id: 6,
    level: 6,
    location: 'forest',
    title: 'HTML Meaning',
    description: 'What does HTML stand for?',
    code: `<!-- HTML is used to create web pages -->
<html>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>`,
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Home Tool Markup Language',
      'Hyperlink Text Machine Language',
    ],
    correctAnswer: 0,
    hint: 'It\'s used to mark up and structure text on the web...',
    explanation: 'HTML stands for Hyper Text Markup Language. It\'s the standard language for creating web pages.',
  },
  {
    id: 7,
    level: 7,
    location: 'forest',
    title: 'Not a Language',
    description: 'Which of these is NOT a programming language?',
    code: `// Some of these are programming languages
// One of them is something else entirely!`,
    options: [
      'Python',
      'Java',
      'Microsoft Word',
      'JavaScript',
    ],
    correctAnswer: 2,
    hint: 'Think about which one you use to write documents...',
    explanation: 'Microsoft Word is a word processing application, not a programming language. Python, Java, and JavaScript are all programming languages.',
  },
  {
    id: 8,
    level: 8,
    location: 'forest',
    title: 'Code Comments',
    description: 'What is a comment in code used for?',
    code: `// This is a comment in JavaScript
# This is a comment in Python

/* Comments are special! */`,
    options: [
      'Making the program run faster',
      'Explaining what the code does',
      'Creating bugs',
      'Deleting code',
    ],
    correctAnswer: 1,
    hint: 'Comments help humans understand the code...',
    explanation: 'Comments are used to explain what the code does. They are ignored by the computer but help programmers understand the code.',
  },
  {
    id: 9,
    level: 9,
    location: 'forest',
    title: 'Python Comments',
    description: 'What symbol starts a comment in Python?',
    code: `___ This is a comment in Python
print("Hello World")`,
    options: [
      '//',
      '#',
      '/*',
      '--',
    ],
    correctAnswer: 1,
    hint: 'It\'s a symbol often called a "hash" or "pound" sign...',
    explanation: 'In Python, the # symbol starts a single-line comment. Everything after # on that line is ignored.',
  },
  {
    id: 10,
    level: 10,
    location: 'forest',
    title: 'Problem Solving First Step',
    description: 'What is the first step in solving a programming problem?',
    code: `// You have a programming task to complete
// What should you do FIRST?`,
    options: [
      'Write code immediately',
      'Turn off the computer',
      'Understand the problem',
      'Delete all files',
    ],
    correctAnswer: 2,
    hint: 'Before you can solve something, you need to know what it is...',
    explanation: 'Understanding the problem is always the first step! You can\'t write a good solution without knowing exactly what you\'re trying to solve.',
  },
];
