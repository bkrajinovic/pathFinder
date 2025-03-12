import { getStartingAndEndingCharacterPosition, handleUnvisitedPosition, handleVisitedPosition } from 'src/utils/positions';
import { isOutOfBounds, isEndingPosition } from 'src/utils/validators';
import { determineStartingDirection } from 'src/utils/directions';
import { MapArray, Directions, Position } from "src/types";

interface PathResult {
  path: string[];
  error: boolean;
  collectedLetters: string[];
}

export const findPath = (equalizedMap: MapArray): PathResult => {
  const { startingPosition, endingPosition, error } = getStartingAndEndingCharacterPosition(equalizedMap);

  if (error) return { path: [], collectedLetters: [], error: true };

  let isError: boolean = false;
  const path: string[] = [];
  const visited = new Set<string>();
  const collectedLetters: string[] = [];
  const position: Position = { ...startingPosition };
  let previousDirection: Directions | null = null;

  if (startingPosition) {
    path.push('@');
    previousDirection = determineStartingDirection(equalizedMap, position);
  }

  if (!previousDirection) return { path: [], collectedLetters: [], error: true };

  while (true) {
    const currentChar = equalizedMap[position.rowIndex]?.[position.cellIndex];
    const posKey = `${position.rowIndex},${position.cellIndex}`;

    if (isOutOfBounds(equalizedMap, position) || currentChar === ' ') {
      isError = true;
      break;
    }

    if (isEndingPosition(position, endingPosition)) {
      path.push('x');
      break;
    }

    if (visited.has(posKey)) {
      const result = handleVisitedPosition(equalizedMap, position, visited, previousDirection, path, collectedLetters);
      if (result.error) {
        isError = true;
        break;
      }
      previousDirection = result.previousDirection;
    } else {
      const result = handleUnvisitedPosition(equalizedMap, position, visited, previousDirection, path, collectedLetters, currentChar, posKey);
      if (result.error) {
        isError = true;
        break;
      }
      previousDirection = result.previousDirection;
    }
  }

  return { path, collectedLetters, error: isError };
};