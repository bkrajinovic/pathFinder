import { MapArray, Position, Directions, HandlePositionResults } from "src/types";
import { moveInDirection, updateDirection } from "./directions";
import { isOutOfBounds, isValidMove } from "./validators";
import { UPPERCASE_LETTERS } from 'src/helpers/patterns';

export const getStartingAndEndingCharacterPosition = (equalizedMap: MapArray) => {
  const startingPositions = [];
  const endingPositions = [];
  let isError = false;

  for (let rowIndex = 0; rowIndex < equalizedMap.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < equalizedMap[rowIndex].length; cellIndex++) {
      if (equalizedMap[rowIndex][cellIndex] === '@') {
        startingPositions.push({ rowIndex, cellIndex });
      }

      if (equalizedMap[rowIndex][cellIndex] === 'x') {
        endingPositions.push({ rowIndex, cellIndex });
      }
    }
  }

  if (startingPositions.length !== 1 || endingPositions.length !== 1) {
    isError = true;
  }

  return {
    startingPosition: startingPositions[0],
    endingPosition: endingPositions[0],
    error: isError,
  };
};

export const handleVisitedPosition = (
  equalizedMap: MapArray,
  position: Position,
  visited: Set<string>,
  previousDirection: Directions | null,
  path: string[],
  collectedLetters: string[]
): HandlePositionResults => {
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
      if (UPPERCASE_LETTERS.test(equalizedMap[newPosition.rowIndex][newPosition.cellIndex])) {
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
          if (UPPERCASE_LETTERS.test(equalizedMap[newPosition.rowIndex][newPosition.cellIndex]) && !visited.has(`${newPosition.rowIndex},${newPosition.cellIndex}`)) {
            collectedLetters.push(equalizedMap[newPosition.rowIndex][newPosition.cellIndex]);
          }

          moveInDirection(innerNewPosition, innerDirection);

          if (isOutOfBounds(equalizedMap, innerNewPosition)) continue;

          const innerNewPosKey = `${innerNewPosition.rowIndex},${innerNewPosition.cellIndex}`;

          if (!visited.has(innerNewPosKey) && isValidMove(equalizedMap, newPosition, innerDirection)) {
            if (UPPERCASE_LETTERS.test(equalizedMap[newPosition.rowIndex][newPosition.cellIndex]) && !visited.has(`${newPosition.rowIndex},${newPosition.cellIndex}`)) {
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

export const handleUnvisitedPosition = (
  equalizedMap: MapArray,
  position: Position,
  visited: Set<string>,
  previousDirection: Directions | null,
  path: string[],
  collectedLetters: string[],
  currentChar: string,
  posKey: string
): HandlePositionResults => {
  path.push(currentChar);
  visited.add(posKey);

  if (UPPERCASE_LETTERS.test(currentChar)) {
    collectedLetters.push(currentChar);
  }

  if (currentChar === '+' || UPPERCASE_LETTERS.test(currentChar)) {
    if (previousDirection) {
      const newDirection = updateDirection(equalizedMap, position, previousDirection);

      if (newDirection === previousDirection && currentChar === '+') {
        return { previousDirection, error: true };
      }

      if (newDirection) {
        previousDirection = newDirection;
      }
    } else {
      return { previousDirection, error: true };
    }
  } else {
    if (previousDirection) {
      moveInDirection(position, previousDirection);
    }
  }

  return { previousDirection, error: false };
};
