import { determineStartingDirection, moveInDirection, updateDirection } from 'src/utils/directions';
import { isOutOfBounds, isEndingPosition, isValidMove } from 'src/utils/validators';
import { getStartingAndEndingCharacterPosition } from 'src/utils/positions';
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

  if (equalizedMap[position.rowIndex][position.cellIndex] === '@') {
    path.push('@');
    previousDirection = determineStartingDirection(equalizedMap, position);
  }

  if (!previousDirection) return { path: [], collectedLetters: [], error: true };

  while (true) {
    const currentChar = equalizedMap[position.rowIndex]?.[position.cellIndex];
    const posKey = `${position.rowIndex},${position.cellIndex}`;

    if (isOutOfBounds(equalizedMap, position)) {
      isError = true;
      break;
    }

    if (currentChar === ' ') {
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
      path.push(currentChar);
      visited.add(posKey);

      if (/[A-Z]/.test(currentChar)) {
        collectedLetters.push(currentChar);
      }

      if (currentChar === '+' || /[A-Z]/.test(currentChar)) {
        if (previousDirection) {
          const newDirection = updateDirection(equalizedMap, position, previousDirection);

          if (newDirection === previousDirection && currentChar === '+') {
            isError = true;
            break;
          }

          if (newDirection) {
            previousDirection = newDirection;
          }
        } else {
          break;
        }
      } else {
        if (previousDirection) {
          moveInDirection(position, previousDirection);
        }
      }
    }
  }

  return { path, collectedLetters, error: isError };
};
interface HandleVisitedPositionResult {
  previousDirection: Directions | null;
  error: boolean;
}

const handleVisitedPosition = (
  equalizedMap: MapArray,
  position: Position,
  visited: Set<string>,
  previousDirection: Directions | null,
  path: string[],
  collectedLetters: string[]
): HandleVisitedPositionResult => {
  const possibleDirections: Directions[] = [previousDirection, 'right', 'left', 'down', 'up'].filter((dir): dir is Directions => dir !== null);
  const currentChar = equalizedMap[position.rowIndex]?.[position.cellIndex];
  let foundUnvisited = false;

  path.push(currentChar);

  for (const direction of possibleDirections) {
    const newPosition = { ...position };

    if (isOutOfBounds(equalizedMap, newPosition)) continue;

    moveInDirection(newPosition, direction);

    const newPosKey = `${newPosition.rowIndex},${newPosition.cellIndex}`;

    if (!visited.has(newPosKey) && isValidMove(equalizedMap, position, direction)) {
      if (/[A-Z]/.test(equalizedMap[newPosition.rowIndex][newPosition.cellIndex])) {
        collectedLetters.push(equalizedMap[newPosition.rowIndex][newPosition.cellIndex]);
      }

      position.rowIndex = newPosition.rowIndex;
      position.cellIndex = newPosition.cellIndex;
      visited.add(newPosKey);
      previousDirection = direction;
      foundUnvisited = true;
      break;
    }
  }
  if (!foundUnvisited) {
    let continueFromVisited = false;
    for (const direction of possibleDirections) {
      const newPosition = { ...position };

      moveInDirection(newPosition, direction);

      if (isOutOfBounds(equalizedMap, newPosition)) continue;

      const newPosKey = `${newPosition.rowIndex},${newPosition.cellIndex}`;

      if (visited.has(newPosKey)) {
        const innerPossibleDirections: Directions[] = ['right', 'left', 'down', 'up'];
        for (const innerDirection of innerPossibleDirections) {
          const innerNewPosition = { ...newPosition };
          if (/[A-Z]/.test(equalizedMap[newPosition.rowIndex][newPosition.cellIndex]) && !visited.has(`${newPosition.rowIndex},${newPosition.cellIndex}`)) {
            collectedLetters.push(equalizedMap[newPosition.rowIndex][newPosition.cellIndex]);
          }

          moveInDirection(innerNewPosition, innerDirection);

          if (isOutOfBounds(equalizedMap, innerNewPosition)) continue;

          const innerNewPosKey = `${innerNewPosition.rowIndex},${innerNewPosition.cellIndex}`;

          if (!visited.has(innerNewPosKey) && isValidMove(equalizedMap, newPosition, innerDirection)) {
            if (/[A-Z]/.test(equalizedMap[newPosition.rowIndex][newPosition.cellIndex]) && !visited.has(`${newPosition.rowIndex},${newPosition.cellIndex}`)) {
              collectedLetters.push(equalizedMap[newPosition.rowIndex][newPosition.cellIndex]);
            }

            path.push(equalizedMap[newPosition.rowIndex][newPosition.cellIndex]);
            position.rowIndex = innerNewPosition.rowIndex;
            position.cellIndex = innerNewPosition.cellIndex;
            visited.add(innerNewPosKey);
            previousDirection = innerDirection;
            continueFromVisited = true;
            break;
          }
        }
        if (continueFromVisited) break;
      }
    }
    if (!continueFromVisited) return { previousDirection, error: true };
  }
  return { previousDirection, error: false };
};