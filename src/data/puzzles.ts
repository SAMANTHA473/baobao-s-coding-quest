export interface Puzzle {
  id: number;
  level: number;
  location: 'forest' | 'desert' | 'castle';
  title: string;
  description: string;
  code: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

export const puzzles: Puzzle[] = [
  {
    id: 1,
    level: 1,
    location: 'forest',
    title: 'Find the Bug!',
    description: 'BaoBao found some code, but there\'s a bug! Which line has the error?',
    code: `function sayHello() {
  console.log("Hello, World!")
  console.log("Welcome to coding!"
}`,
    options: [
      'Line 1: Missing parentheses',
      'Line 2: Wrong quotes',
      'Line 3: Missing closing parenthesis',
      'No bugs here!',
    ],
    correctAnswer: 2,
    hint: 'Look carefully at the parentheses on each line...',
    explanation: 'Line 3 is missing a closing parenthesis ")" at the end of the console.log statement.',
  },
  {
    id: 2,
    level: 2,
    location: 'forest',
    title: 'Variable Detective',
    description: 'Help BaoBao fix this variable declaration!',
    code: `let my name = "BaoBao";
console.log(my name);`,
    options: [
      'Variable names cannot have spaces',
      'Should use const instead of let',
      'Missing semicolon',
      'Nothing is wrong',
    ],
    correctAnswer: 0,
    hint: 'Think about what makes a valid variable name...',
    explanation: 'Variable names in JavaScript cannot contain spaces. It should be "myName" or "my_name".',
  },
  {
    id: 3,
    level: 3,
    location: 'forest',
    title: 'String Surgery',
    description: 'What\'s wrong with this string?',
    code: `let message = "Hello, I said "Hi there!" to my friend";`,
    options: [
      'The string is too long',
      'Quotes inside quotes need to be escaped',
      'Should use single quotes',
      'Missing variable type',
    ],
    correctAnswer: 1,
    hint: 'How do you include quotes inside a quoted string?',
    explanation: 'When using quotes inside a string, you need to escape them with a backslash (\\") or use different quote types.',
  },
  {
    id: 4,
    level: 4,
    location: 'forest',
    title: 'Function Fiasco',
    description: 'This function won\'t run! Can you spot why?',
    code: `function addNumbers(a, b)
  return a + b;
}`,
    options: [
      'Missing opening curly brace {',
      'Parameters are wrong',
      'Return statement is incorrect',
      'Function name is invalid',
    ],
    correctAnswer: 0,
    hint: 'Functions need both an opening and closing brace...',
    explanation: 'The function is missing an opening curly brace "{" after the parameters.',
  },
  {
    id: 5,
    level: 5,
    location: 'forest',
    title: 'Array Adventure',
    description: 'Help BaoBao access the correct element!',
    code: `let fruits = ["apple", "banana", "cherry"];
let firstFruit = fruits[1];
// BaoBao wants the first fruit!`,
    options: [
      'Use fruits[0] instead',
      'Use fruits.first()',
      'Use fruits[-1]',
      'This code is correct',
    ],
    correctAnswer: 0,
    hint: 'Arrays in JavaScript start counting from 0...',
    explanation: 'Array indices start at 0. fruits[0] gives "apple", fruits[1] gives "banana".',
  },
  {
    id: 6,
    level: 6,
    location: 'forest',
    title: 'Comparison Confusion',
    description: 'Why does this comparison give unexpected results?',
    code: `let age = "25";
if (age == 25) {
  console.log("You are 25!");
}`,
    options: [
      'Nothing wrong, it works correctly',
      'Should use === for strict comparison',
      'Cannot compare string and number',
      'If statement syntax is wrong',
    ],
    correctAnswer: 1,
    hint: 'There\'s a difference between == and ===...',
    explanation: 'Using === would be safer as it checks both value AND type. "25" == 25 is true, but "25" === 25 is false.',
  },
  {
    id: 7,
    level: 7,
    location: 'forest',
    title: 'Loop Logic',
    description: 'This loop runs forever! How do we fix it?',
    code: `let count = 0;
while (count < 5) {
  console.log(count);
}`,
    options: [
      'Change < to <=',
      'Add count++ inside the loop',
      'Use a for loop instead',
      'The condition is wrong',
    ],
    correctAnswer: 1,
    hint: 'What makes a while loop eventually stop?',
    explanation: 'The loop needs count++ to increment the counter, otherwise count stays at 0 forever.',
  },
  {
    id: 8,
    level: 8,
    location: 'forest',
    title: 'Object Obstacle',
    description: 'Help BaoBao access the dragon\'s name!',
    code: `let dragon = {
  name: "BaoBao",
  age: 5
};
console.log(dragon[name]);`,
    options: [
      'Use dragon.name or dragon["name"]',
      'Use dragon->name',
      'Use dragon.getName()',
      'The object is defined wrong',
    ],
    correctAnswer: 0,
    hint: 'How do you access object properties?',
    explanation: 'Use dot notation (dragon.name) or bracket notation with quotes (dragon["name"]).',
  },
  {
    id: 9,
    level: 9,
    location: 'forest',
    title: 'Semicolon Search',
    description: 'Find where the missing semicolon is needed!',
    code: `let x = 5
let y = 10
let sum = x + y
console.log(sum)`,
    options: [
      'After every line',
      'Only after line 3',
      'Semicolons are optional in JavaScript',
      'Only before console.log',
    ],
    correctAnswer: 2,
    hint: 'JavaScript has automatic semicolon insertion...',
    explanation: 'Semicolons are technically optional in JavaScript due to ASI (Automatic Semicolon Insertion), though many developers prefer adding them.',
  },
  {
    id: 10,
    level: 10,
    location: 'forest',
    title: 'Final Forest Challenge',
    description: 'Find ALL the bugs in this code!',
    code: `function greeting(name)
  const message = "Hello " + name
  console.log(mesage);
  return message
}`,
    options: [
      'Missing {, typo in "mesage"',
      'Only missing opening brace',
      'Only the typo "mesage"',
      'Nothing is wrong',
    ],
    correctAnswer: 0,
    hint: 'Look for multiple issues...',
    explanation: 'Two bugs: 1) Missing opening brace { after function declaration, 2) "mesage" should be "message".',
  },
];

export const getPuzzlesByLocation = (location: 'forest' | 'desert' | 'castle') => {
  return puzzles.filter((p) => p.location === location);
};

export const getPuzzleByLevel = (level: number) => {
  return puzzles.find((p) => p.level === level);
};
