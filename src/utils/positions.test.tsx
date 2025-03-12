import { getStartingAndEndingCharacterPosition, handleVisitedPosition, handleUnvisitedPosition } from './positions';
import { MapArray, Position, Directions } from 'src/types';
import { describe, it, expect } from 'vitest';

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

describe('handleVisitedPosition', () => {
  it('should handle visited positions correctly', () => {
    const equalizedMap: MapArray = [
      ['@', '-', '-', 'x'],
      ['|', ' ', ' ', '|'],
      ['+', '-', '-', '+']
    ];
    const position: Position = { rowIndex: 0, cellIndex: 1 };
    const visited = new Set<string>(['0,0', '0,1']);
    const previousDirection: Directions = 'right';
    const path: string[] = ['@'];
    const collectedLetters: string[] = [];

    const result = handleVisitedPosition(equalizedMap, position, visited, previousDirection, path, collectedLetters);

    expect(result.error).toBe(false);
    expect(result.previousDirection).toBe('right');
    expect(visited.has('0,2')).toBe(true);
    expect(path).toContain('-');
  });

  it('should return error if no unvisited positions are found', () => {
    const equalizedMap: MapArray = [
      ['@', '-', '-', 'x'],
      [' ', ' ', ' ', '|'],
      ['+', '-', '-', '+']
    ];
    const position: Position = { rowIndex: 0, cellIndex: 1 };
    const visited = new Set<string>(['0,0', '0,1', '0,2', '0,3']);
    const previousDirection: Directions = 'right';
    const path: string[] = ['@'];
    const collectedLetters: string[] = [];

    const result = handleVisitedPosition(equalizedMap, position, visited, previousDirection, path, collectedLetters);

    expect(result.error).toBe(true);
  });
});

describe('handleUnvisitedPosition', () => {
  it('should handle unvisited positions correctly', () => {
    const equalizedMap: MapArray = [
      ['@', '-', '-', 'x'],
      ['|', ' ', ' ', '|'],
      ['+', '-', '-', '+']
    ];
    const position: Position = { rowIndex: 0, cellIndex: 1 };
    const visited = new Set<string>(['0,0']);
    const previousDirection: Directions = 'right';
    const path: string[] = ['@'];
    const collectedLetters: string[] = [];
    const currentChar = '-';
    const posKey = '0,1';

    const result = handleUnvisitedPosition(equalizedMap, position, visited, previousDirection, path, collectedLetters, currentChar, posKey);

    expect(result.error).toBe(false);
    expect(result.previousDirection).toBe('right');
    expect(path).toContain('-');
    expect(visited.has('0,1')).toBe(true);
  });

  it('should return error if new direction is the same as previous direction and currentChar is "+"', () => {
    const equalizedMap: MapArray = [
      ['@', '-', '-', 'x'],
      ['|', ' ', ' ', '|'],
      ['+', ' ', ' ', '|'],
      ['|', '-', '-', '+']
    ];
    const position: Position = { rowIndex: 2, cellIndex: 0 };
    const visited = new Set<string>(['0,0', '1,0']);
    const previousDirection: Directions = 'down';
    const path: string[] = ['@', '|'];
    const collectedLetters: string[] = [];
    const currentChar = '+';
    const posKey = '2,0';

    const result = handleUnvisitedPosition(equalizedMap, position, visited, previousDirection, path, collectedLetters, currentChar, posKey);

    expect(result.error).toBe(true);
  });
});