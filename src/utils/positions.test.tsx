import { getStartingAndEndingCharacterPosition } from './positions';
import { MapArray } from 'src/types';

describe('getStartingAndEndingCharacterPosition', () => {
  it('should return the correct starting and ending positions', () => {
    const map: MapArray = [
      ['.', '.', '.', '.', '.'],
      ['.', '@', '.', '.', '.'],
      ['.', '.', '.', 'x', '.'],
      ['.', '.', '.', '.', '.'],
    ];

    const result = getStartingAndEndingCharacterPosition(map);

    expect(result).toEqual({
      startingPosition: { rowIndex: 1, cellIndex: 1 },
      endingPosition: { rowIndex: 2, cellIndex: 3 },
      error: false,
    });
  });

  it('should return an error if there is no starting position', () => {
    const map: MapArray = [
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', 'x', '.'],
      ['.', '.', '.', '.', '.'],
    ];

    const result = getStartingAndEndingCharacterPosition(map);

    expect(result).toEqual({
      startingPosition: undefined,
      endingPosition: { rowIndex: 2, cellIndex: 3 },
      error: true,
    });
  });

  it('should return an error if there is no ending position', () => {
    const map: MapArray = [
      ['.', '.', '.', '.', '.'],
      ['.', '@', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
    ];

    const result = getStartingAndEndingCharacterPosition(map);

    expect(result).toEqual({
      startingPosition: { rowIndex: 1, cellIndex: 1 },
      endingPosition: undefined,
      error: true,
    });
  });

  it('should return an error if there are multiple starting positions', () => {
    const map: MapArray = [
      ['.', '.', '.', '.', '.'],
      ['.', '@', '.', '@', '.'],
      ['.', '.', '.', 'x', '.'],
      ['.', '.', '.', '.', '.'],
    ];

    const result = getStartingAndEndingCharacterPosition(map);

    expect(result).toEqual({
      startingPosition: { rowIndex: 1, cellIndex: 1 },
      endingPosition: { rowIndex: 2, cellIndex: 3 },
      error: true,
    });
  });

  it('should return an error if there are multiple ending positions', () => {
    const map: MapArray = [
      ['.', '.', '.', '.', '.'],
      ['.', '@', '.', '.', '.'],
      ['.', '.', 'x', 'x', '.'],
      ['.', '.', '.', '.', '.'],
    ];

    const result = getStartingAndEndingCharacterPosition(map);

    expect(result).toEqual({
      startingPosition: { rowIndex: 1, cellIndex: 1 },
      endingPosition: { rowIndex: 2, cellIndex: 2 },
      error: true,
    });
  });
});