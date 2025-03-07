import { getStartingAndEndingCharacterPosition, nextPositionBasedOnPreviousDirection } from 'src/helpers/positionGetters';

type MapArray = string[][];
type Directions = 'up' | 'down' | 'left' | 'right';

export const findPath = (map2D: MapArray) => {
  const { startingPosition, endingPosition } = getStartingAndEndingCharacterPosition(map2D);
  const position = { ...startingPosition };
  const path = [];
  let previousDirection: Directions | null = null;

  // Determine the starting direction
  if (map2D[position.rowIndex][position.cellIndex] === '@') {
    path.push('@');
    if (position.cellIndex + 1 < map2D[0].length && (map2D[position.rowIndex][position.cellIndex + 1] === '-' || /[A-Z]/.test(map2D[position.rowIndex][position.cellIndex + 1]) || map2D[position.rowIndex][position.cellIndex + 1] === '+')) {
      position.cellIndex++;
      previousDirection = 'right';
    } else if (position.cellIndex - 1 >= 0 && (map2D[position.rowIndex][position.cellIndex - 1] === '-' || /[A-Z]/.test(map2D[position.rowIndex][position.cellIndex - 1]) || map2D[position.rowIndex][position.cellIndex - 1] === '+')) {
      position.cellIndex--;
      previousDirection = 'left';
    } else if (position.rowIndex + 1 < map2D.length && (map2D[position.rowIndex + 1][position.cellIndex] === '|' || /[A-Z]/.test(map2D[position.rowIndex + 1][position.cellIndex]) || map2D[position.rowIndex + 1][position.cellIndex] === '+')) {
      position.rowIndex++;
      previousDirection = 'down';
    } else if (position.rowIndex - 1 >= 0 && (map2D[position.rowIndex - 1][position.cellIndex] === '|' || /[A-Z]/.test(map2D[position.rowIndex - 1][position.cellIndex]) || map2D[position.rowIndex - 1][position.cellIndex] === '+')) {
      position.rowIndex--;
      previousDirection = 'up';
    }
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (position.rowIndex < 0 || position.rowIndex >= map2D.length || position.cellIndex < 0 || position.cellIndex >= map2D[0].length) {
      break;
    }

    const currentChar = map2D[position.rowIndex][position.cellIndex];

    if (currentChar === '-') {
      path.push('-');
      if (previousDirection) {
        nextPositionBasedOnPreviousDirection(position, previousDirection);
      } else {
        break;
      }
    } else if (currentChar === '|') {
      path.push('|');
      if (previousDirection) {
        nextPositionBasedOnPreviousDirection(position, previousDirection);
      } else {
        break;
      }
    } else if (/[A-Z]/.test(currentChar)) {
      path.push(currentChar);
      // Try to continue in the previous direction first
      if (previousDirection === 'right' && position.cellIndex + 1 < map2D[0].length && map2D[position.rowIndex][position.cellIndex + 1] !== ' ') {
        position.cellIndex++;
      } else if (previousDirection === 'left' && position.cellIndex - 1 >= 0 && map2D[position.rowIndex][position.cellIndex - 1] !== ' ') {
        position.cellIndex--;
      } else if (previousDirection === 'down' && position.rowIndex + 1 < map2D.length && map2D[position.rowIndex + 1][position.cellIndex] !== ' ') {
        position.rowIndex++;
      } else if (previousDirection === 'up' && position.rowIndex - 1 >= 0 && map2D[position.rowIndex - 1][position.cellIndex] !== ' ') {
        position.rowIndex--;
      } else {
        // Check all possible directions except the one we came from
        if (previousDirection !== 'left' && position.cellIndex + 1 < map2D[0].length && map2D[position.rowIndex][position.cellIndex + 1] !== ' ') {
          position.cellIndex++;
          previousDirection = 'right';
        } else if (previousDirection !== 'right' && position.cellIndex - 1 >= 0 && map2D[position.rowIndex][position.cellIndex - 1] !== ' ') {
          position.cellIndex--;
          previousDirection = 'left';
        } else if (previousDirection !== 'up' && position.rowIndex + 1 < map2D.length && map2D[position.rowIndex + 1][position.cellIndex] !== ' ') {
          position.rowIndex++;
          previousDirection = 'down';
        } else if (previousDirection !== 'down' && position.rowIndex - 1 >= 0 && map2D[position.rowIndex - 1][position.cellIndex] !== ' ') {
          position.rowIndex--;
          previousDirection = 'up';
        } else {
          break;
        }
      }
    } else if (currentChar === '+') {
      path.push('+');
      // Try to continue in the previous direction first
      if (previousDirection === 'right' && position.cellIndex + 1 < map2D[0].length && map2D[position.rowIndex][position.cellIndex + 1] !== ' ') {
        position.cellIndex++;
      } else if (previousDirection === 'left' && position.cellIndex - 1 >= 0 && map2D[position.rowIndex][position.cellIndex - 1] !== ' ') {
        position.cellIndex--;
      } else if (previousDirection === 'down' && position.rowIndex + 1 < map2D.length && map2D[position.rowIndex + 1][position.cellIndex] !== ' ') {
        position.rowIndex++;
      } else if (previousDirection === 'up' && position.rowIndex - 1 >= 0 && map2D[position.rowIndex - 1][position.cellIndex] !== ' ') {
        position.rowIndex--;
      } else {
        // Check all possible directions except the one we came from
        if (previousDirection !== 'left' && position.cellIndex + 1 < map2D[0].length && map2D[position.rowIndex][position.cellIndex + 1] !== ' ') {
          position.cellIndex++;
          previousDirection = 'right';
        } else if (previousDirection !== 'right' && position.cellIndex - 1 >= 0 && map2D[position.rowIndex][position.cellIndex - 1] !== ' ') {
          position.cellIndex--;
          previousDirection = 'left';
        } else if (previousDirection !== 'up' && position.rowIndex + 1 < map2D.length && map2D[position.rowIndex + 1][position.cellIndex] !== ' ') {
          position.rowIndex++;
          previousDirection = 'down';
        } else if (previousDirection !== 'down' && position.rowIndex - 1 >= 0 && map2D[position.rowIndex - 1][position.cellIndex] !== ' ') {
          position.rowIndex--;
          previousDirection = 'up';
        } else {
          break;
        }
      }
    } else if (currentChar === 'x') {
      path.push('x');
      break;
    } else {
      break;
    }

    if (position.rowIndex === endingPosition.rowIndex && position.cellIndex === endingPosition.cellIndex) {
      path.push('x');
      break;
    }
  }

  console.log(path);

  return path;
};