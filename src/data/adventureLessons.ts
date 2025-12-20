// Adventure lessons data - 10 animals per location with lessons aligned to upcoming questions

export interface AnimalLesson {
  id: number;
  animal: string;
  emoji: string;
  name: string;
  lesson: string;
}

export interface LocationAdventure {
  locationId: 'forest' | 'desert' | 'castle';
  locationName: string;
  animals: AnimalLesson[];
}

export const forestAdventure: LocationAdventure = {
  locationId: 'forest',
  locationName: 'Forest of Bugs',
  animals: [
    {
      id: 1,
      animal: 'owl',
      emoji: '🦉',
      name: 'Oliver the Owl',
      lesson: 'A "bug" in programming isn\'t an insect - it\'s an error in your code that makes it not work right!',
    },
    {
      id: 2,
      animal: 'squirrel',
      emoji: '🐿️',
      name: 'Sammy the Squirrel',
      lesson: 'Many programming languages use a semicolon (;) to mark the end of a statement!',
    },
    {
      id: 3,
      animal: 'rabbit',
      emoji: '🐰',
      name: 'Ruby the Rabbit',
      lesson: 'Debugging means finding and fixing errors in your code - like being a code detective!',
    },
    {
      id: 4,
      animal: 'fox',
      emoji: '🦊',
      name: 'Felix the Fox',
      lesson: 'In Python, we use print() to display text and values on the screen!',
    },
    {
      id: 5,
      animal: 'deer',
      emoji: '🦌',
      name: 'Diana the Deer',
      lesson: 'A variable is like a labeled container that stores data - you give it a name and put something inside!',
    },
    {
      id: 6,
      animal: 'bear',
      emoji: '🐻',
      name: 'Bruno the Bear',
      lesson: 'HTML stands for Hyper Text Markup Language - it\'s used to create web pages!',
    },
    {
      id: 7,
      animal: 'wolf',
      emoji: '🐺',
      name: 'Winston the Wolf',
      lesson: 'Programming languages like Python, Java, and JavaScript are used to write code. Word processors are different!',
    },
    {
      id: 8,
      animal: 'hedgehog',
      emoji: '🦔',
      name: 'Harry the Hedgehog',
      lesson: 'Comments are notes in your code that explain what it does - the computer ignores them!',
    },
    {
      id: 9,
      animal: 'badger',
      emoji: '🦡',
      name: 'Bella the Badger',
      lesson: 'In Python, use the # symbol to start a comment - everything after it is for humans only!',
    },
    {
      id: 10,
      animal: 'moose',
      emoji: '🫎',
      name: 'Max the Moose',
      lesson: 'Always understand the problem first before writing code - it\'s the most important step!',
    },
  ],
};

export const desertAdventure: LocationAdventure = {
  locationId: 'desert',
  locationName: 'Desert of Loops',
  animals: [
    {
      id: 1,
      animal: 'camel',
      emoji: '🐪',
      name: 'Carlos the Camel',
      lesson: 'A loop is code that repeats multiple times - like walking in circles until you reach your goal!',
    },
    {
      id: 2,
      animal: 'scorpion',
      emoji: '🦂',
      name: 'Stella the Scorpion',
      lesson: 'Use a "for loop" when you know exactly how many times you want to repeat something!',
    },
    {
      id: 3,
      animal: 'lizard',
      emoji: '🦎',
      name: 'Leo the Lizard',
      lesson: 'An infinite loop runs forever and never stops - this usually crashes your program!',
    },
    {
      id: 4,
      animal: 'snake',
      emoji: '🐍',
      name: 'Sophie the Snake',
      lesson: 'A while loop keeps running as long as its condition is true. When false, it stops!',
    },
    {
      id: 5,
      animal: 'vulture',
      emoji: '🦅',
      name: 'Victor the Vulture',
      lesson: 'range(5) in Python gives you 5 numbers: 0, 1, 2, 3, 4. So the loop runs 5 times!',
    },
    {
      id: 6,
      animal: 'roadrunner',
      emoji: '🐦',
      name: 'Riley the Roadrunner',
      lesson: 'A loop counter keeps track of how many times the loop has run - like counting your steps!',
    },
    {
      id: 7,
      animal: 'coyote',
      emoji: '🐕',
      name: 'Cooper the Coyote',
      lesson: 'The "break" keyword lets you exit a loop early - like an emergency exit!',
    },
    {
      id: 8,
      animal: 'fennec',
      emoji: '🦊',
      name: 'Fiona the Fennec',
      lesson: 'The "continue" keyword skips to the next iteration of the loop without exiting!',
    },
    {
      id: 9,
      animal: 'beetle',
      emoji: '🪲',
      name: 'Benny the Beetle',
      lesson: 'A nested loop is a loop inside another loop - the inner one runs completely for each outer step!',
    },
    {
      id: 10,
      animal: 'hawk',
      emoji: '🦅',
      name: 'Hunter the Hawk',
      lesson: 'In Python, while loops use "while condition:" with a colon and indented code below!',
    },
  ],
};

export const castleAdventure: LocationAdventure = {
  locationId: 'castle',
  locationName: 'Castle of Syntax',
  animals: [
    {
      id: 1,
      animal: 'dragon',
      emoji: '🐲',
      name: 'Derek the Dragon',
      lesson: 'Syntax means the rules for writing code correctly - like grammar for programming!',
    },
    {
      id: 2,
      animal: 'unicorn',
      emoji: '🦄',
      name: 'Uma the Unicorn',
      lesson: 'A function is a reusable block of code - write it once, use it many times!',
    },
    {
      id: 3,
      animal: 'phoenix',
      emoji: '🔥',
      name: 'Penny the Phoenix',
      lesson: 'The equals sign (=) assigns a value to a variable. score = 100 stores 100 in score!',
    },
    {
      id: 4,
      animal: 'griffin',
      emoji: '🦁',
      name: 'Gregory the Griffin',
      lesson: 'An if statement makes decisions - it runs different code based on true or false conditions!',
    },
    {
      id: 5,
      animal: 'pegasus',
      emoji: '🐴',
      name: 'Percy the Pegasus',
      lesson: 'Double equals (==) checks if two values are the same - it asks "are these equal?"',
    },
    {
      id: 6,
      animal: 'fairy',
      emoji: '🧚',
      name: 'Faye the Fairy',
      lesson: 'A string is text data wrapped in quotes - like "Hello" or \'World\'!',
    },
    {
      id: 7,
      animal: 'wizard',
      emoji: '🧙',
      name: 'Walter the Wizard',
      lesson: 'To write a string correctly, always wrap your text in quotation marks: "Hello"!',
    },
    {
      id: 8,
      animal: 'knight',
      emoji: '🐎',
      name: 'Kevin the Knight',
      lesson: 'A Boolean is a value that can only be true or false - perfect for yes/no decisions!',
    },
    {
      id: 9,
      animal: 'princess',
      emoji: '👸',
      name: 'Princess Aria',
      lesson: 'The "return" statement sends a value back from a function to where it was called!',
    },
    {
      id: 10,
      animal: 'king',
      emoji: '👑',
      name: 'King Syntax',
      lesson: 'An array or list stores multiple values together - like a collection in one container!',
    },
  ],
};

export const getAdventureForLocation = (locationId: 'forest' | 'desert' | 'castle'): LocationAdventure => {
  switch (locationId) {
    case 'forest':
      return forestAdventure;
    case 'desert':
      return desertAdventure;
    case 'castle':
      return castleAdventure;
    default:
      return forestAdventure;
  }
};
