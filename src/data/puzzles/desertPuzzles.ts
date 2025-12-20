import { Puzzle } from './types';

export const desertPuzzles: Puzzle[] = [
  {
    id: 11,
    level: 11,
    location: 'desert',
    title: 'What is a Loop?',
    description: 'What is a loop in programming?',
    code: `// Loops help us repeat actions
for (let i = 0; i < 5; i++) {
  console.log("Hello!");
}`,
    options: [
      'Code that runs once and stops',
      'Code that repeats multiple times',
      'Code that never runs',
      'Code that deletes itself',
    ],
    correctAnswer: 1,
    hint: 'Think about going around in circles...',
    explanation: 'A loop is a programming structure that repeats a block of code multiple times until a condition is met.',
  },
  {
    id: 12,
    level: 12,
    location: 'desert',
    title: 'Best Loop Choice',
    description: 'Which loop is best when you know exactly how many times to repeat?',
    code: `// You want to repeat something exactly 10 times
// Which loop type is best?`,
    options: [
      'while loop',
      'for loop',
      'do-while loop',
      'infinite loop',
    ],
    correctAnswer: 1,
    hint: 'This loop type has the count built right into it...',
    explanation: 'A for loop is best when you know exactly how many times to repeat, because it has a built-in counter.',
  },
  {
    id: 13,
    level: 13,
    location: 'desert',
    title: 'Never Ending',
    description: 'What happens if a loop never stops?',
    code: `while (true) {
  console.log("Running...");
  // This never stops!
}`,
    options: [
      'The program works perfectly',
      'An infinite loop occurs',
      'The computer turns off',
      'Nothing happens',
    ],
    correctAnswer: 1,
    hint: 'What do you call something that goes on forever?',
    explanation: 'When a loop never stops, it\'s called an infinite loop. This usually freezes the program and is considered a bug.',
  },
  {
    id: 14,
    level: 14,
    location: 'desert',
    title: 'While Loop Condition',
    description: 'In a while loop, when does the loop stop?',
    code: `let x = 0;
while (x < 5) {
  console.log(x);
  x++;
}`,
    options: [
      'When the condition becomes true',
      'When the condition becomes false',
      'After exactly 5 runs',
      'It never stops',
    ],
    correctAnswer: 1,
    hint: 'The loop keeps going WHILE the condition is true...',
    explanation: 'A while loop continues as long as its condition is true. It stops when the condition becomes false.',
  },
  {
    id: 15,
    level: 15,
    location: 'desert',
    title: 'Range Count',
    description: 'How many times will this loop run: for i in range(5)?',
    code: `# Python loop
for i in range(5):
    print(i)
# What gets printed?`,
    options: [
      '4 times',
      '5 times',
      '6 times',
      '0 times',
    ],
    correctAnswer: 1,
    hint: 'range(5) creates numbers from 0 to 4...',
    explanation: 'range(5) generates numbers 0, 1, 2, 3, 4 - that\'s 5 numbers, so the loop runs 5 times.',
  },
  {
    id: 16,
    level: 16,
    location: 'desert',
    title: 'Loop Counter Purpose',
    description: 'What is the purpose of a loop counter?',
    code: `for (let i = 0; i < 10; i++) {
  // 'i' is the loop counter
  console.log("Count: " + i);
}`,
    options: [
      'To make the loop run faster',
      'To track how many times the loop has run',
      'To create bugs in the code',
      'To stop the loop immediately',
    ],
    correctAnswer: 1,
    hint: 'The counter keeps count of iterations...',
    explanation: 'A loop counter tracks how many times the loop has run. It helps control when the loop should stop.',
  },
  {
    id: 17,
    level: 17,
    location: 'desert',
    title: 'Early Exit',
    description: 'Which keyword is used to exit a loop early?',
    code: `for (let i = 0; i < 10; i++) {
  if (i === 5) {
    ___; // Exit the loop here
  }
}`,
    options: [
      'stop',
      'exit',
      'break',
      'end',
    ],
    correctAnswer: 2,
    hint: 'You want to "break" out of the loop...',
    explanation: 'The break keyword immediately exits the loop, even if the condition is still true.',
  },
  {
    id: 18,
    level: 18,
    location: 'desert',
    title: 'Skip Iteration',
    description: 'Which keyword skips the current iteration and continues to the next?',
    code: `for (let i = 0; i < 5; i++) {
  if (i === 2) {
    ___; // Skip this iteration
  }
  console.log(i);
}`,
    options: [
      'skip',
      'next',
      'continue',
      'pass',
    ],
    correctAnswer: 2,
    hint: 'You want to "continue" to the next iteration...',
    explanation: 'The continue keyword skips the rest of the current iteration and moves to the next one.',
  },
  {
    id: 19,
    level: 19,
    location: 'desert',
    title: 'Nested Loops',
    description: 'What is a nested loop?',
    code: `for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 2; j++) {
    console.log(i, j);
  }
}`,
    options: [
      'A loop inside another loop',
      'A loop that runs twice',
      'A broken loop',
      'A loop without a counter',
    ],
    correctAnswer: 0,
    hint: 'One loop is "nested" inside the other like a bird\'s nest...',
    explanation: 'A nested loop is a loop inside another loop. The inner loop runs completely for each iteration of the outer loop.',
  },
  {
    id: 20,
    level: 20,
    location: 'desert',
    title: 'Python While Syntax',
    description: 'Which is the correct way to write a while loop in Python?',
    code: `# Which syntax is correct for Python?
x = 0`,
    options: [
      'while (x < 10) { }',
      'while x < 10 do:',
      'while x < 10:',
      'loop while x < 10',
    ],
    correctAnswer: 2,
    hint: 'Python uses a colon and indentation...',
    explanation: 'In Python, while loops use the syntax "while condition:" followed by indented code. No parentheses or braces needed.',
  },
];
