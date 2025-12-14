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
