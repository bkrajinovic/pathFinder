import { MAPS } from 'src/constants/maps';

export type Position = { rowIndex: number; cellIndex: number };

export type Directions = 'up' | 'down' | 'left' | 'right';

export type MapKeys = keyof typeof MAPS;

export type MapArray = string[][];

export interface HandlePositionResults {
    previousDirection: Directions | null;
    error: boolean;
  }
