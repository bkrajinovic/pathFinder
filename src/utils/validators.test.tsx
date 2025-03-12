import { isValidPathChar, isValidMove, isOutOfBounds, isEndingPosition } from './validators';
import { Directions, Position, MapArray } from 'src/types';

describe('validators', () => {
  describe('isValidPathChar', () => {
    it('should return true for valid path characters', () => {
      expect(isValidPathChar('-')).toBe(true);
      expect(isValidPathChar('|')).toBe(true);
      expect(isValidPathChar('+')).toBe(true);
      expect(isValidPathChar('x')).toBe(true);
      expect(isValidPathChar('A')).toBe(true);
      expect(isValidPathChar('Z')).toBe(true);
    });

    it('should return false for invalid path characters', () => {
      expect(isValidPathChar(' ')).toBe(false);
      expect(isValidPathChar('.')).toBe(false);
      expect(isValidPathChar('1')).toBe(false);
      expect(isValidPathChar('@')).toBe(false);
    });
  });

  describe('isValidMove', () => {
    it('should return true for a valid move', () => {
      const map: MapArray = [
        ['-', '-', '-', '-', '-'],
        ['-', '@', '-', '-', '-'],
        ['-', '-', '-', 'x', '-'],
        ['-', '-', '-', '-', '-'],
      ];
      const position: Position = { rowIndex: 1, cellIndex: 1 };
      const direction: Directions = 'right';

      expect(isValidMove(map, position, direction)).toBe(true);
    });

    it('should return false for an invalid move', () => {
      const map: MapArray = [
        ['-', '-', '-', '-', '-'],
        [' ', '@', '-', '-', '-'],
        ['-', '-', '-', 'x', '-'],
        ['-', '-', '-', '-', '-'],
      ];
      const position: Position = { rowIndex: 1, cellIndex: 1 };
      const direction: Directions = 'left';

      expect(isValidMove(map, position, direction)).toBe(false);
    });
  });

  describe('isOutOfBounds', () => {
    it('should return true for out of bounds positions', () => {
      const map: MapArray = [
        ['-', '-', '-', '-', '-'],
        ['-', '@', '-', '-', '-'],
        ['-', '-', '-', 'x', '-'],
        ['-', '-', '-', '-', '-'],
      ];
      expect(isOutOfBounds(map, { rowIndex: -1, cellIndex: 0 })).toBe(true);
      expect(isOutOfBounds(map, { rowIndex: 0, cellIndex: -1 })).toBe(true);
      expect(isOutOfBounds(map, { rowIndex: 4, cellIndex: 0 })).toBe(true);
      expect(isOutOfBounds(map, { rowIndex: 0, cellIndex: 5 })).toBe(true);
    });

    it('should return false for in bounds positions', () => {
      const map: MapArray = [
        ['-', '-', '-', '-', '-'],
        ['-', '@', '-', '-', '-'],
        ['-', '-', '-', 'x', '-'],
        ['-', '-', '-', '-', '-'],
      ];
      expect(isOutOfBounds(map, { rowIndex: 0, cellIndex: 0 })).toBe(false);
      expect(isOutOfBounds(map, { rowIndex: 3, cellIndex: 4 })).toBe(false);
    });
  });

  describe('isEndingPosition', () => {
    it('should return true for matching positions', () => {
      const position: Position = { rowIndex: 2, cellIndex: 3 };
      const endingPosition: Position = { rowIndex: 2, cellIndex: 3 };
      expect(isEndingPosition(position, endingPosition)).toBe(true);
    });

    it('should return false for non-matching positions', () => {
      const position: Position = { rowIndex: 2, cellIndex: 3 };
      const endingPosition: Position = { rowIndex: 1, cellIndex: 3 };
      expect(isEndingPosition(position, endingPosition)).toBe(false);
    });
  });
});