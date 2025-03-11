import { MapArray } from 'src/types';

export const equalizeMapRows = (map: MapArray): MapArray => {
    const maxLength = map.reduce((max: number, row: string[]) => Math.max(max, row.length), 0);

    const normalizedMap = map.map((row: string[]) => {
      while (row.length < maxLength) {
        row.push(' ');
      }
      return row;
    });

    return normalizedMap;
};