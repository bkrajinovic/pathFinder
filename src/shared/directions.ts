import { isValidMove, isValidPathChar } from "./validators";
import { Directions, Position } from "./types";

export const moveInDirection = (position: Position, direction: Directions) => {
  if (direction === 'left') position.cellIndex--;
  if (direction === 'right') position.cellIndex++;
  if (direction === 'up') position.rowIndex--;
  if (direction === 'down') position.rowIndex++;
};

export const oppositeDirection = (direction: Directions): Directions => {
  const opposites: { [key in Directions]: Directions } = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left',
  };
  return opposites[direction];
};

export const determineStartingDirection = (map2D: string[][], position: Position): Directions | null => {
  if (position.cellIndex + 1 < map2D[0].length && isValidPathChar(map2D[position.rowIndex][position.cellIndex + 1])) {
    position.cellIndex++;
    return 'right';
  }
  if (position.cellIndex - 1 >= 0 && isValidPathChar(map2D[position.rowIndex][position.cellIndex - 1])) {
    position.cellIndex--;
    return 'left';
  }
  if (position.rowIndex + 1 < map2D.length && isValidPathChar(map2D[position.rowIndex + 1][position.cellIndex])) {
    position.rowIndex++;
    return 'down';
  }
  if (position.rowIndex - 1 >= 0 && isValidPathChar(map2D[position.rowIndex - 1][position.cellIndex])) {
    position.rowIndex--;
    return 'up';
  }
  return null;
};

export const updateDirection = (map2D: string[][], position: Position, previousDirection: Directions): Directions | null => {
  const possibleDirections: Directions[] = [previousDirection, 'right', 'left', 'down', 'up'];
  for (const direction of possibleDirections) {
    if (direction !== oppositeDirection(previousDirection) && isValidMove(map2D, position, direction)) {
      moveInDirection(position, direction);
      return direction;
    }
  }
  return null;
};