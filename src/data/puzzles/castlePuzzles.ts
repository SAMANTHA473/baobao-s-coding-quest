import { Puzzle } from './types';

export const castlePuzzles: Puzzle[] = [
  {
    id: 21,
    level: 21,
    location: 'castle',
    title: 'Function Declaration',
    description: 'Which function declaration is correct?',
    code: `// Option A:
function greet(name) {
  return "Hello " + name;
}

// Option B:
function greet(name)
  return "Hello " + name;`,
    options: [
      'Only Option A is correct',
      'Only Option B is correct',
      'Both are correct',
      'Neither is correct',
    ],
    correctAnswer: 0,
    hint: 'Function bodies need curly braces...',
    explanation: 'Option A is correct. Option B is missing curly braces {} around the function body.',
  },
  {
    id: 22,
    level: 22,
    location: 'castle',
    title: 'Arrow Function Syntax',
    description: 'Which arrow function syntax is valid?',
    code: `// Which is correct?
const add = (a, b) => a + b;
const add = (a, b) => { a + b };
const add = (a, b) -> a + b;`,
    options: [
      'First one only',
      'First and second',
      'All three are valid',
      'None are valid',
    ],
    correctAnswer: 0,
    hint: 'Arrow functions use => and need return with braces...',
    explanation: 'Only the first is correct. The second needs "return" with braces. The third uses -> instead of =>.',
  },
  {
    id: 23,
    level: 23,
    location: 'castle',
    title: 'Template Literals',
    description: 'What\'s the correct way to use template literals?',
    code: `let name = "BaoBao";
let age = 5;
// Goal: "BaoBao is 5 years old"`,
    options: [
      '`${name} is ${age} years old`',
      '"${name} is ${age} years old"',
      '`{name} is {age} years old`',
      '`$name is $age years old`',
    ],
    correctAnswer: 0,
    hint: 'Template literals use backticks and ${...}',
    explanation: 'Template literals use backticks (`) with ${variable} syntax for interpolation.',
  },
  {
    id: 24,
    level: 24,
    location: 'castle',
    title: 'Object Shorthand',
    description: 'What does this shorthand create?',
    code: `let name = "BaoBao";
let color = "green";
let dragon = { name, color };`,
    options: [
      '{ name: "name", color: "color" }',
      '{ name: "BaoBao", color: "green" }',
      '{ "name", "color" }',
      'Syntax error',
    ],
    correctAnswer: 1,
    hint: 'Property shorthand uses variable names as keys...',
    explanation: 'Object shorthand { name, color } is equivalent to { name: name, color: color }, using variable values.',
  },
  {
    id: 25,
    level: 25,
    location: 'castle',
    title: 'Destructuring Arrays',
    description: 'What values do a and b get?',
    code: `const [a, b] = [1, 2, 3, 4, 5];
console.log(a, b);`,
    options: [
      '1 2',
      '[1, 2, 3, 4, 5] undefined',
      '1 [2, 3, 4, 5]',
      'Syntax error',
    ],
    correctAnswer: 0,
    hint: 'Array destructuring assigns in order...',
    explanation: 'Array destructuring assigns elements in order: a gets 1, b gets 2. Extra elements are ignored.',
  },
  {
    id: 26,
    level: 26,
    location: 'castle',
    title: 'Spread Operator',
    description: 'What does the spread operator do here?',
    code: `const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];`,
    options: [
      '[1, 2, 3, 4]',
      '[[1, 2], [3, 4]]',
      '[...arr1, ...arr2]',
      'Error: invalid syntax',
    ],
    correctAnswer: 0,
    hint: 'Spread "expands" array elements...',
    explanation: 'The spread operator (...) expands arrays into individual elements, creating [1, 2, 3, 4].',
  },
  {
    id: 27,
    level: 27,
    location: 'castle',
    title: 'Ternary Operator',
    description: 'What value does result get?',
    code: `let score = 85;
let result = score >= 60 ? "Pass" : "Fail";`,
    options: [
      '"Pass"',
      '"Fail"',
      'true',
      '85',
    ],
    correctAnswer: 0,
    hint: 'condition ? valueIfTrue : valueIfFalse',
    explanation: 'The ternary operator checks if score >= 60 (true), so result gets "Pass".',
  },
  {
    id: 28,
    level: 28,
    location: 'castle',
    title: 'Optional Chaining',
    description: 'What does this code return?',
    code: `const user = { name: "BaoBao" };
console.log(user?.address?.city);`,
    options: [
      'undefined',
      'null',
      'Error: Cannot read property',
      '""',
    ],
    correctAnswer: 0,
    hint: 'Optional chaining (?.) safely accesses nested properties...',
    explanation: 'Optional chaining returns undefined if address doesn\'t exist, instead of throwing an error.',
  },
  {
    id: 29,
    level: 29,
    location: 'castle',
    title: 'Nullish Coalescing',
    description: 'What values trigger the default?',
    code: `let value = null;
let result = value ?? "default";
// What about: value = 0 ?? "default"?`,
    options: [
      'null and undefined only',
      'null, undefined, 0, and ""',
      'Any falsy value',
      'Only undefined',
    ],
    correctAnswer: 0,
    hint: '?? only checks for null/undefined, not other falsy values...',
    explanation: 'Nullish coalescing (??) only uses the default for null or undefined, not 0 or empty string.',
  },
  {
    id: 30,
    level: 30,
    location: 'castle',
    title: 'Castle Syntax Master',
    description: 'Fix all the syntax errors in this code!',
    code: `const dragon = {
  name = "BaoBao",
  speak: () {
    console.log(\`I am \${this.name}\`)
  }
}`,
    options: [
      'Use : instead of = for properties, add => for arrow function',
      'Only change = to :',
      'Only add => after ()',
      'The code is correct',
    ],
    correctAnswer: 0,
    hint: 'Object properties use colons, arrow functions need =>...',
    explanation: 'Two fixes: 1) name: "BaoBao" (colon not equals), 2) speak: () => { (arrow function syntax).',
  },
];
