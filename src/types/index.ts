import { MAPS } from 'src/constants/maps';

export type Position = { rowIndex: number; cellIndex: number };

export type Directions = 'up' | 'down' | 'left' | 'right';

export type MapArray = string[][];

export type MapKeys = keyof typeof MAPS;
