import { MapArray, Position, Directions } from "./types";
import { moveInDirection } from "./directions";

export const isValidPathChar = (char: string): boolean => {
  return char === '-' || char === '|' || char === '+' || /[A-Z]/.test(char) || char === 'x';
};

export const isValidMove = (map2D: MapArray, position: Position, direction: Directions): boolean => {
  const newPosition = { ...position };
  moveInDirection(newPosition, direction);
  return !isOutOfBounds(map2D, newPosition) && isValidPathChar(map2D[newPosition.rowIndex]?.[newPosition.cellIndex]);
};

export const isOutOfBounds = (map2D: MapArray, position: Position): boolean => {
  return (
    position.rowIndex < 0 ||
    position.rowIndex >= map2D.length ||
    position.cellIndex < 0 ||
    position.cellIndex >= map2D[0].length
  );
};

export const isEndingPosition = (position: Position, endingPosition: Position): boolean => {
  return position.rowIndex === endingPosition.rowIndex && position.cellIndex === endingPosition.cellIndex;
};
