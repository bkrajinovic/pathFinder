import { MapArray } from 'src/shared/types';

export const handleParseMap = (map: MapArray): MapArray => {
    // Find the length of the longest array
    const maxLength = map.reduce((max: number, row: string[]) => Math.max(max, row.length), 0);

    // Ensure every array is the same length
    const normalizedMap = map.map((row: string[]) => {
      while (row.length < maxLength) {
        row.push(' ');
      }
      return row;
    });

    return normalizedMap;
};