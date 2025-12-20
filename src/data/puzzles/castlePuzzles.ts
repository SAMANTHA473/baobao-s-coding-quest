import { Puzzle } from './types';

export const castlePuzzles: Puzzle[] = [
  {
    id: 21,
    level: 21,
    location: 'castle',
    title: 'What is Syntax?',
    description: 'What is syntax in programming?',
    code: `// Every language has rules for writing
// In programming, we call these rules...`,
    options: [
      'A type of loop',
      'The rules for writing code correctly',
      'A programming language',
      'A type of bug',
    ],
    correctAnswer: 1,
    hint: 'It\'s like grammar rules for code...',
    explanation: 'Syntax is the set of rules that defines how code must be written in a programming language, like grammar for human languages.',
  },
  {
    id: 22,
    level: 22,
    location: 'castle',
    title: 'What is a Function?',
    description: 'What is a function?',
    code: `function greet(name) {
  return "Hello, " + name;
}

greet("BaoBao"); // Returns "Hello, BaoBao"`,
    options: [
      'A type of variable',
      'A reusable block of code',
      'An error message',
      'A loop counter',
    ],
    correctAnswer: 1,
    hint: 'You can use it again and again...',
    explanation: 'A function is a reusable block of code that performs a specific task. You can call it multiple times with different inputs.',
  },
  {
    id: 23,
    level: 23,
    location: 'castle',
    title: 'Assignment Symbol',
    description: 'What symbol assigns a value to a variable?',
    code: `let score ___ 100;
// Which symbol goes in the blank?`,
    options: [
      ':',
      '=',
      '==',
      '->',
    ],
    correctAnswer: 1,
    hint: 'It\'s the equals sign, but just one of them...',
    explanation: 'The single equals sign (=) is used to assign a value to a variable. score = 100 means "store 100 in score".',
  },
  {
    id: 24,
    level: 24,
    location: 'castle',
    title: 'If Statement Purpose',
    description: 'What is an if statement used for?',
    code: `if (age >= 18) {
  console.log("You can vote!");
} else {
  console.log("Too young to vote.");
}`,
    options: [
      'To repeat code',
      'To make decisions in code',
      'To create variables',
      'To end the program',
    ],
    correctAnswer: 1,
    hint: 'It lets your code choose between different paths...',
    explanation: 'An if statement is used to make decisions in code. It runs different code depending on whether a condition is true or false.',
  },
  {
    id: 25,
    level: 25,
    location: 'castle',
    title: 'Double Equals',
    description: 'What does == check?',
    code: `let a = 5;
let b = 5;

if (a == b) {
  console.log("They are equal!");
}`,
    options: [
      'Assigns a value',
      'Checks if two values are equal',
      'Adds two numbers',
      'Creates a new variable',
    ],
    correctAnswer: 1,
    hint: 'Double equals compares values...',
    explanation: 'The double equals (==) checks if two values are equal. It returns true if they match, false if they don\'t.',
  },
  {
    id: 26,
    level: 26,
    location: 'castle',
    title: 'What is a String?',
    description: 'What is a string?',
    code: `let message = "Hello, World!";
let name = 'BaoBao';`,
    options: [
      'A number with decimals',
      'Text data in quotes',
      'A true/false value',
      'A list of items',
    ],
    correctAnswer: 1,
    hint: 'It\'s text wrapped in quotation marks...',
    explanation: 'A string is text data enclosed in quotes. It can contain letters, numbers, symbols, and spaces.',
  },
  {
    id: 27,
    level: 27,
    location: 'castle',
    title: 'String Syntax',
    description: 'Which is the correct way to write "Hello" as a string?',
    code: `// Which one is a valid string?`,
    options: [
      'Hello',
      '"Hello"',
      '(Hello)',
      '[Hello]',
    ],
    correctAnswer: 1,
    hint: 'Strings need quotation marks around them...',
    explanation: '"Hello" is correct because strings must be wrapped in quotation marks (single \' or double ").',
  },
  {
    id: 28,
    level: 28,
    location: 'castle',
    title: 'Boolean Values',
    description: 'What is a Boolean value?',
    code: `let isHappy = true;
let isSad = false;`,
    options: [
      'A number between 0 and 10',
      'True or False',
      'A text message',
      'A list of options',
    ],
    correctAnswer: 1,
    hint: 'It can only be one of two things...',
    explanation: 'A Boolean value can only be true or false. It\'s used for yes/no decisions and conditions.',
  },
  {
    id: 29,
    level: 29,
    location: 'castle',
    title: 'Return Statement',
    description: 'What does "return" do?',
    code: `function add(a, b) {
  return a + b;
}

let result = add(3, 5); // result = 8`,
    options: [
      'Ends the program',
      'Sends a value back from the function',
      'Prints text to screen',
      'Creates a new function',
    ],
    correctAnswer: 1,
    hint: 'The function gives something back...',
    explanation: 'The return statement sends a value back from the function to wherever it was called. The function then ends.',
  },
  {
    id: 30,
    level: 30,
    location: 'castle',
    title: 'Arrays and Lists',
    description: 'What is an array / list?',
    code: `let fruits = ["apple", "banana", "cherry"];
let numbers = [1, 2, 3, 4, 5];`,
    options: [
      'A single value',
      'A collection of values stored together',
      'A type of function',
      'A loop counter',
    ],
    correctAnswer: 1,
    hint: 'It holds multiple items in one place...',
    explanation: 'An array (or list) is a collection of values stored together in a single variable. You can access items by their position (index).',
  },
];
