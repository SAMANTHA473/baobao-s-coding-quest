import { Puzzle } from './types';

export const desertPuzzles: Puzzle[] = [
  {
    id: 11,
    level: 11,
    location: 'desert',
    title: 'For Loop Fundamentals',
    description: 'How many times will this loop run?',
    code: `for (let i = 0; i < 5; i++) {
  console.log(i);
}`,
    options: [
      '4 times',
      '5 times',
      '6 times',
      'Infinite times',
    ],
    correctAnswer: 1,
    hint: 'Count from 0 up to (but not including) 5...',
    explanation: 'The loop runs 5 times: i = 0, 1, 2, 3, 4. When i becomes 5, the condition i < 5 is false.',
  },
  {
    id: 12,
    level: 12,
    location: 'desert',
    title: 'While Loop Wonder',
    description: 'What will be the final value of x?',
    code: `let x = 1;
while (x < 10) {
  x = x * 2;
}
console.log(x);`,
    options: [
      '8',
      '10',
      '16',
      '32',
    ],
    correctAnswer: 2,
    hint: 'Trace through: 1 → 2 → 4 → 8 → 16...',
    explanation: 'x doubles each iteration: 1→2→4→8→16. When x=16, it\'s no longer < 10, so the loop stops.',
  },
  {
    id: 13,
    level: 13,
    location: 'desert',
    title: 'Break the Loop',
    description: 'What number will be printed last?',
    code: `for (let i = 1; i <= 10; i++) {
  if (i === 6) {
    break;
  }
  console.log(i);
}`,
    options: [
      '5',
      '6',
      '10',
      'Nothing is printed',
    ],
    correctAnswer: 0,
    hint: 'What does "break" do inside a loop?',
    explanation: 'The break statement exits the loop immediately when i equals 6, so 5 is the last number printed.',
  },
  {
    id: 14,
    level: 14,
    location: 'desert',
    title: 'Continue Conundrum',
    description: 'Which numbers will be skipped?',
    code: `for (let i = 1; i <= 5; i++) {
  if (i % 2 === 0) {
    continue;
  }
  console.log(i);
}`,
    options: [
      'Odd numbers (1, 3, 5)',
      'Even numbers (2, 4)',
      'All numbers',
      'No numbers',
    ],
    correctAnswer: 1,
    hint: 'What does i % 2 === 0 check for?',
    explanation: 'continue skips even numbers (2, 4) because i % 2 === 0 is true for them. Only 1, 3, 5 are printed.',
  },
  {
    id: 15,
    level: 15,
    location: 'desert',
    title: 'Nested Loop Puzzle',
    description: 'How many stars (*) will be printed?',
    code: `for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 2; j++) {
    console.log("*");
  }
}`,
    options: [
      '3 stars',
      '5 stars',
      '6 stars',
      '9 stars',
    ],
    correctAnswer: 2,
    hint: 'Outer loop runs 3 times, inner loop runs 2 times each...',
    explanation: 'The outer loop runs 3 times, and for each outer iteration, the inner loop runs 2 times. 3 × 2 = 6 stars.',
  },
  {
    id: 16,
    level: 16,
    location: 'desert',
    title: 'Array Iteration',
    description: 'What\'s wrong with this loop?',
    code: `let colors = ["red", "green", "blue"];
for (let i = 1; i <= colors.length; i++) {
  console.log(colors[i]);
}`,
    options: [
      'Should start at i = 0',
      'Should use < instead of <=',
      'Both A and B are correct',
      'Nothing is wrong',
    ],
    correctAnswer: 2,
    hint: 'Arrays are 0-indexed and have length 3...',
    explanation: 'Both issues: Start at 0 (not 1) and use < (not <=). Current code skips "red" and tries to access undefined colors[3].',
  },
  {
    id: 17,
    level: 17,
    location: 'desert',
    title: 'forEach Magic',
    description: 'What will this forEach loop print?',
    code: `let nums = [10, 20, 30];
nums.forEach((num, index) => {
  console.log(index + ": " + num);
});`,
    options: [
      '1: 10, 2: 20, 3: 30',
      '0: 10, 1: 20, 2: 30',
      '10: 0, 20: 1, 30: 2',
      'Error: forEach is not a function',
    ],
    correctAnswer: 1,
    hint: 'The second parameter is the index, starting from 0...',
    explanation: 'forEach provides each element and its 0-based index. Output: 0: 10, 1: 20, 2: 30.',
  },
  {
    id: 18,
    level: 18,
    location: 'desert',
    title: 'Do-While Discovery',
    description: 'What\'s special about do-while loops?',
    code: `let x = 10;
do {
  console.log(x);
  x++;
} while (x < 5);`,
    options: [
      'Nothing is printed',
      '10 is printed once',
      'Prints 10, 11, 12, 13, 14',
      'Infinite loop',
    ],
    correctAnswer: 1,
    hint: 'A do-while loop always runs at least once...',
    explanation: 'do-while executes the block first, then checks the condition. So 10 is printed once, then x=11 fails the x<5 check.',
  },
  {
    id: 19,
    level: 19,
    location: 'desert',
    title: 'Loop Variable Scope',
    description: 'What will this code output?',
    code: `for (let i = 0; i < 3; i++) {
  // loop body
}
console.log(i);`,
    options: [
      '3',
      '2',
      'undefined',
      'Error: i is not defined',
    ],
    correctAnswer: 3,
    hint: 'Variables declared with let inside for loops...',
    explanation: 'Variables declared with let in a for loop are scoped to that loop. Outside the loop, i doesn\'t exist.',
  },
  {
    id: 20,
    level: 20,
    location: 'desert',
    title: 'Desert Loop Master',
    description: 'Fix this loop to count down from 5 to 1!',
    code: `for (let i = 5; i > 0; i++) {
  console.log(i);
}`,
    options: [
      'Change i++ to i--',
      'Change i > 0 to i < 0',
      'Change let i = 5 to let i = 1',
      'The code is correct',
    ],
    correctAnswer: 0,
    hint: 'To count down, we need to decrease i...',
    explanation: 'To count down, change i++ to i--. Currently i++ makes it count up forever (infinite loop).',
  },
];
