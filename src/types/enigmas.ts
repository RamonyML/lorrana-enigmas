export interface Enigma {
  id: number;
  title: string;
  question: string;
  hint?: string;
  answer: string;
  nextEnigmaId: number;
  isFinal?: boolean;
  background?: string;
  icon?: string;
}

export interface GameState {
  currentEnigmaId: number;
  completedEnigmas: number[];
  showHint: boolean;
  userAnswer: string;
  isCorrect: boolean | null;
  gameCompleted: boolean;
  startTime: Date;
} 