import { moveInDirection, oppositeDirection, determineStartingDirection, updateDirection } from './directions';
import { Directions, Position } from 'src/types';

describe('directions', () => {
  describe('moveInDirection', () => {
    it('should move left', () => {
      const position: Position = { rowIndex: 1, cellIndex: 1 };
      moveInDirection(position, 'left');
      expect(position).toEqual({ rowIndex: 1, cellIndex: 0 });
    });

    it('should move right', () => {
      const position: Position = { rowIndex: 1, cellIndex: 1 };
      moveInDirection(position, 'right');
      expect(position).toEqual({ rowIndex: 1, cellIndex: 2 });
    });

    it('should move up', () => {
      const position: Position = { rowIndex: 1, cellIndex: 1 };
      moveInDirection(position, 'up');
      expect(position).toEqual({ rowIndex: 0, cellIndex: 1 });
    });

    it('should move down', () => {
      const position: Position = { rowIndex: 1, cellIndex: 1 };
      moveInDirection(position, 'down');
      expect(position).toEqual({ rowIndex: 2, cellIndex: 1 });
    });
  });

  describe('oppositeDirection', () => {
    it('should return the opposite direction', () => {
      expect(oppositeDirection('up')).toBe('down');
      expect(oppositeDirection('down')).toBe('up');
      expect(oppositeDirection('left')).toBe('right');
      expect(oppositeDirection('right')).toBe('left');
    });
  });

  describe('determineStartingDirection', () => {
    it('should determine the starting direction to the right', () => {
      const equalizedMap = [
        ['.', '.', '.', '.', '.'],
        ['.', '@', '-', '.', '.'],
        ['.', '.', '.', '.', '.'],
      ];
      const position: Position = { rowIndex: 1, cellIndex: 1 };

      const direction = determineStartingDirection(equalizedMap, position);
      expect(direction).toBe('right');
      expect(position).toEqual({ rowIndex: 1, cellIndex: 2 });
    });

    it('should determine the starting direction to the left', () => {
      const equalizedMap = [
        ['.', '.', '.', '.', '.'],
        ['.', '-', '@', '.', '.'],
        ['.', '.', '.', '.', '.'],
      ];
      const position: Position = { rowIndex: 1, cellIndex: 2 };

      const direction = determineStartingDirection(equalizedMap, position);
      expect(direction).toBe('left');
      expect(position).toEqual({ rowIndex: 1, cellIndex: 1 });
    });

    it('should determine the starting direction down', () => {
      const equalizedMap = [
        ['.', '.', '.', '.', '.'],
        ['.', '@', '.', '.', '.'],
        ['.', '-', '.', '.', '.'],
      ];
      const position: Position = { rowIndex: 1, cellIndex: 1 };

      const direction = determineStartingDirection(equalizedMap, position);
      expect(direction).toBe('down');
      expect(position).toEqual({ rowIndex: 2, cellIndex: 1 });
    });

    it('should determine the starting direction up', () => {
      const equalizedMap = [
        ['.', '-', '.', '.', '.'],
        ['.', '@', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
      ];
      const position: Position = { rowIndex: 1, cellIndex: 1 };

      const direction = determineStartingDirection(equalizedMap, position);
      expect(direction).toBe('up');
      expect(position).toEqual({ rowIndex: 0, cellIndex: 1 });
    });

    it('should return null if no valid starting direction is found', () => {
      const equalizedMap = [
        ['.', '.', '.', '.', '.'],
        ['.', '@', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
      ];
      const position: Position = { rowIndex: 1, cellIndex: 1 };

      const direction = determineStartingDirection(equalizedMap, position);
      expect(direction).toBeNull();
    });
  });

  describe('updateDirection', () => {
    it('should update the direction to a valid move', () => {
      const equalizedMap = [
        ['.', '.', '.', '.', '.'],
        ['.', '@', '-', '.', '.'],
        ['.', '|', '.', '.', '.'],
      ];
      const position: Position = { rowIndex: 1, cellIndex: 1 };
      const previousDirection: Directions = 'left';


      const direction = updateDirection(equalizedMap, position, previousDirection);
      expect(direction).toBe('down');
      expect(position).toEqual({ rowIndex: 2, cellIndex: 1 });
    });

    it('should return null if no valid move is found', () => {
      const equalizedMap = [
        ['.', '.', '.', '.', '.'],
        ['.', '@', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
      ];
      const position: Position = { rowIndex: 1, cellIndex: 1 };
      const previousDirection: Directions = 'left';


      const direction = updateDirection(equalizedMap, position, previousDirection);
      expect(direction).toBeNull();
    });
  });
});