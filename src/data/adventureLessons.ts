// Adventure lessons data - 10 animals per location with short hints for upcoming questions

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
      lesson: 'Every opening parenthesis ( needs a closing one ) to work properly!',
    },
    {
      id: 2,
      animal: 'squirrel',
      emoji: '🐿️',
      name: 'Sammy the Squirrel',
      lesson: 'Variable names are like labels - they cannot have spaces in them!',
    },
    {
      id: 3,
      animal: 'rabbit',
      emoji: '🐰',
      name: 'Ruby the Rabbit',
      lesson: 'When you put quotes inside quotes, you need to escape them with a backslash!',
    },
    {
      id: 4,
      animal: 'fox',
      emoji: '🦊',
      name: 'Felix the Fox',
      lesson: 'Functions need curly braces { } to wrap their code body!',
    },
    {
      id: 5,
      animal: 'deer',
      emoji: '🦌',
      name: 'Diana the Deer',
      lesson: 'Arrays start counting from 0, not 1! The first item is at position 0.',
    },
    {
      id: 6,
      animal: 'bear',
      emoji: '🐻',
      name: 'Bruno the Bear',
      lesson: 'Use === for strict comparison - it checks both value AND type!',
    },
    {
      id: 7,
      animal: 'wolf',
      emoji: '🐺',
      name: 'Winston the Wolf',
      lesson: 'A while loop needs something to change, or it will run forever!',
    },
    {
      id: 8,
      animal: 'hedgehog',
      emoji: '🦔',
      name: 'Harry the Hedgehog',
      lesson: 'Access object properties with dot notation: object.property',
    },
    {
      id: 9,
      animal: 'badger',
      emoji: '🦡',
      name: 'Bella the Badger',
      lesson: 'Semicolons are optional in JavaScript, but many coders prefer them!',
    },
    {
      id: 10,
      animal: 'moose',
      emoji: '🫎',
      name: 'Max the Moose',
      lesson: 'Always double-check for typos in variable names - computers are picky!',
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
      lesson: 'A for loop with i < 5 runs from 0 to 4, that\'s 5 times total!',
    },
    {
      id: 2,
      animal: 'scorpion',
      emoji: '🦂',
      name: 'Stella the Scorpion',
      lesson: 'While loops check the condition first, then run the code if true.',
    },
    {
      id: 3,
      animal: 'lizard',
      emoji: '🦎',
      name: 'Leo the Lizard',
      lesson: 'The break statement stops a loop immediately - like an emergency exit!',
    },
    {
      id: 4,
      animal: 'snake',
      emoji: '🐍',
      name: 'Sophie the Snake',
      lesson: 'Continue skips to the next iteration - it doesn\'t exit the loop.',
    },
    {
      id: 5,
      animal: 'vulture',
      emoji: '🦅',
      name: 'Victor the Vulture',
      lesson: 'Nested loops multiply! 3 outer × 2 inner = 6 total iterations.',
    },
    {
      id: 6,
      animal: 'roadrunner',
      emoji: '🐦',
      name: 'Riley the Roadrunner',
      lesson: 'Loop through arrays with i = 0 and i < array.length.',
    },
    {
      id: 7,
      animal: 'coyote',
      emoji: '🐕',
      name: 'Cooper the Coyote',
      lesson: 'forEach gives you each element AND its index automatically!',
    },
    {
      id: 8,
      animal: 'fennec',
      emoji: '🦊',
      name: 'Fiona the Fennec',
      lesson: 'Do-while loops always run at least once before checking the condition.',
    },
    {
      id: 9,
      animal: 'beetle',
      emoji: '🪲',
      name: 'Benny the Beetle',
      lesson: 'Variables declared with let inside a loop only exist inside that loop!',
    },
    {
      id: 10,
      animal: 'hawk',
      emoji: '🦅',
      name: 'Hunter the Hawk',
      lesson: 'To count down, use i-- instead of i++ in your loop!',
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
      lesson: 'Function bodies must be wrapped in curly braces { }!',
    },
    {
      id: 2,
      animal: 'unicorn',
      emoji: '🦄',
      name: 'Uma the Unicorn',
      lesson: 'Arrow functions use => not -> and need return when using { }.',
    },
    {
      id: 3,
      animal: 'phoenix',
      emoji: '🔥',
      name: 'Penny the Phoenix',
      lesson: 'Template literals use backticks ` and ${variable} for values!',
    },
    {
      id: 4,
      animal: 'griffin',
      emoji: '🦁',
      name: 'Gregory the Griffin',
      lesson: 'Object shorthand: { name } is the same as { name: name }.',
    },
    {
      id: 5,
      animal: 'pegasus',
      emoji: '🐴',
      name: 'Percy the Pegasus',
      lesson: 'Destructuring [a, b] = [1, 2] assigns a=1 and b=2 neatly!',
    },
    {
      id: 6,
      animal: 'fairy',
      emoji: '🧚',
      name: 'Faye the Fairy',
      lesson: 'The spread operator ... expands arrays into individual elements.',
    },
    {
      id: 7,
      animal: 'wizard',
      emoji: '🧙',
      name: 'Walter the Wizard',
      lesson: 'Ternary: condition ? ifTrue : ifFalse - a one-line if-else!',
    },
    {
      id: 8,
      animal: 'knight',
      emoji: '🐎',
      name: 'Kevin the Knight',
      lesson: 'Optional chaining ?. safely accesses nested properties.',
    },
    {
      id: 9,
      animal: 'princess',
      emoji: '👸',
      name: 'Princess Aria',
      lesson: 'Nullish ?? only triggers for null or undefined, not 0 or "".',
    },
    {
      id: 10,
      animal: 'king',
      emoji: '👑',
      name: 'King Syntax',
      lesson: 'Object properties use : not = and arrow functions need =>!',
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
