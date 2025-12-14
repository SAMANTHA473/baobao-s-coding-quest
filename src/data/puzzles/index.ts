import { Puzzle } from './types';
import { forestPuzzles } from './forestPuzzles';
import { desertPuzzles } from './desertPuzzles';
import { castlePuzzles } from './castlePuzzles';

export type { Puzzle };

export const puzzles: Puzzle[] = [
  ...forestPuzzles,
  ...desertPuzzles,
  ...castlePuzzles,
];

export const getPuzzlesByLocation = (location: 'forest' | 'desert' | 'castle') => {
  return puzzles.filter((p) => p.location === location);
};

export const getPuzzleByLevel = (level: number) => {
  return puzzles.find((p) => p.level === level);
};

export const getLocationForLevel = (level: number): 'forest' | 'desert' | 'castle' => {
  if (level <= 10) return 'forest';
  if (level <= 20) return 'desert';
  return 'castle';
};

export const isLocationUnlocked = (location: 'forest' | 'desert' | 'castle', completedLevels: number[]): boolean => {
  if (location === 'forest') return true;
  if (location === 'desert') {
    // Must complete all 10 forest levels (1-10)
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every(level => completedLevels.includes(level));
  }
  if (location === 'castle') {
    // Must complete all 20 levels (1-20)
    return Array.from({ length: 20 }, (_, i) => i + 1).every(level => completedLevels.includes(level));
  }
  return false;
};
