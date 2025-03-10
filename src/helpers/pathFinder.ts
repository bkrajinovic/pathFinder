import { getStartingAndEndingCharacterPosition } from './positionGetters';
import { MapArray, Directions, Position } from "src/shared/types";
interface PathResult {
  path: string[];
  collectedLetters: string[];
  error: string | null;
}

export const findPath = (map2D: MapArray): PathResult => {
  const { startingPosition, endingPosition, error } = getStartingAndEndingCharacterPosition(map2D);
  let isError = error === true ? 'Error' : false;

  if (isError) return { path: [], collectedLetters: [], error: 'Error' };

  const position = { ...startingPosition };
  const path = [];
  const collectedLetters = [];
  const visited = new Set<string>();
  let previousDirection: Directions | null = null;

  // Determine the starting direction
  if (map2D[position.rowIndex][position.cellIndex] === '@') {
    path.push('@');
    previousDirection = determineStartingDirection(map2D, position);
    if (!previousDirection) return { path: [], collectedLetters: [], error: 'Error' };
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const posKey = `${position.rowIndex},${position.cellIndex}`;
    const currentChar = map2D[position.rowIndex]?.[position.cellIndex];

    console.log(currentChar);

    if (isOutOfBounds(map2D, position)) {
      isError = true;
      break;
    }

    if (currentChar === ' ') {
      isError = true;
      break;
    }

    if (currentChar === 'x') {
      path.push(currentChar);
      break;
    }

    if (visited.has(posKey)) {
      path.push(currentChar);
      const possibleDirections: Directions[] = [previousDirection, 'right', 'left', 'down', 'up'].filter((dir): dir is Directions => dir !== null);
      let foundUnvisited = false;
      for (const direction of possibleDirections) {
        const newPosition = { ...position };
        moveInDirection(newPosition, direction);
        if (isOutOfBounds(map2D, newPosition)) continue;
        const newPosKey = `${newPosition.rowIndex},${newPosition.cellIndex}`;

        if (!visited.has(newPosKey) && isValidMove(map2D, position, direction)) {
          if (/[A-Z]/.test(map2D[newPosition.rowIndex][newPosition.cellIndex])) {
            collectedLetters.push(map2D[newPosition.rowIndex][newPosition.cellIndex]);
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
          if (isOutOfBounds(map2D, newPosition)) continue;
          const newPosKey = `${newPosition.rowIndex},${newPosition.cellIndex}`;

          if (visited.has(newPosKey)) {
            const innerPossibleDirections: Directions[] = ['right', 'left', 'down', 'up'];
            for (const innerDirection of innerPossibleDirections) {
              const innerNewPosition = { ...newPosition };
              if (/[A-Z]/.test(map2D[newPosition.rowIndex][newPosition.cellIndex]) && !visited.has(`${newPosition.rowIndex},${newPosition.cellIndex}`)) {
                collectedLetters.push(map2D[newPosition.rowIndex][newPosition.cellIndex]);
              }
              moveInDirection(innerNewPosition, innerDirection);
              if (isOutOfBounds(map2D, innerNewPosition)) continue;
              const innerNewPosKey = `${innerNewPosition.rowIndex},${innerNewPosition.cellIndex}`;

              if (!visited.has(innerNewPosKey) && isValidMove(map2D, newPosition, innerDirection)) {
                if (/[A-Z]/.test(map2D[newPosition.rowIndex][newPosition.cellIndex]) && !visited.has(`${newPosition.rowIndex},${newPosition.cellIndex}`)) {
                  collectedLetters.push(map2D[newPosition.rowIndex][newPosition.cellIndex]);
                }
                path.push(map2D[newPosition.rowIndex][newPosition.cellIndex]);
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
        if (!continueFromVisited) break;
      }
    } else {
      path.push(currentChar);
      visited.add(posKey);

      if (currentChar === ' ') {
        isError = true;
        break;
      }

      if (isEndingPosition(position, endingPosition)) {
        path.push('x');
        break;
      }

      if (/[A-Z]/.test(currentChar)) {
        collectedLetters.push(currentChar);
      }

      if (currentChar === '+' || /[A-Z]/.test(currentChar)) {
        if (previousDirection) {
          const newDirection = updateDirection(map2D, position, previousDirection);
          if (newDirection === previousDirection && currentChar === '+') {
            isError = true;
            break;
          }
          if (newDirection) {
            previousDirection = newDirection;
          } else {
            break;
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

  if (!path.includes('x') && isEndingPosition(position, endingPosition)) {
    path.push('x');
  }

  return { path, collectedLetters, error: isError ? 'Error' : null };
};

const determineStartingDirection = (map2D: MapArray, position: Position): Directions | null => {
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

const updateDirection = (map2D: MapArray, position: Position, previousDirection: Directions): Directions | null => {
  const possibleDirections: Directions[] = [previousDirection, 'right', 'left', 'down', 'up'];
  for (const direction of possibleDirections) {
    if (direction !== oppositeDirection(previousDirection) && isValidMove(map2D, position, direction)) {
      moveInDirection(position, direction);
      return direction;
    }
  }
  return null;
};

const isValidPathChar = (char: string): boolean => {
  return char === '-' || char === '|' || char === '+' || /[A-Z]/.test(char) || char === 'x';
};

const isValidMove = (map2D: MapArray, position: Position, direction: Directions): boolean => {
  const newPosition = { ...position };
  moveInDirection(newPosition, direction);
  return !isOutOfBounds(map2D, newPosition) && isValidPathChar(map2D[newPosition.rowIndex]?.[newPosition.cellIndex]);
};

const moveInDirection = (position: Position, direction: Directions) => {
  if (direction === 'left') position.cellIndex--;
  if (direction === 'right') position.cellIndex++;
  if (direction === 'up') position.rowIndex--;
  if (direction === 'down') position.rowIndex++;
};

const oppositeDirection = (direction: Directions): Directions => {
  const opposites: { [key in Directions]: Directions } = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left',
  };
  return opposites[direction];
};

const isOutOfBounds = (map2D: MapArray, position: Position): boolean => {
  return (
    position.rowIndex < 0 ||
    position.rowIndex >= map2D.length ||
    position.cellIndex < 0 ||
    position.cellIndex >= map2D[0].length
  );
};

const isEndingPosition = (position: Position, endingPosition: Position): boolean => {
  return position.rowIndex === endingPosition.rowIndex && position.cellIndex === endingPosition.cellIndex;
};
