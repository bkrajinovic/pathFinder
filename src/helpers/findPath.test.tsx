import { equalizeMapRows } from 'src/helpers/mapModifiers';
import { findPath } from 'src/helpers/findPath';
import { MAPS } from 'src/constants/maps';

describe('findPath', () => {
  it('should find the correct path for BASIC_EXAMPLE', () => {
    const map2D = equalizeMapRows(MAPS.BASIC_EXAMPLE);
    const pathString = '@---A---+|C|+---+|+-B-x';
    const collectedLetters = 'ACB';
    const expectedPath = pathString.split('');
    const expectedLetters = collectedLetters.split('');
    const result = findPath(map2D);
    expect(result.path).toEqual(expectedPath);
    expect(result.collectedLetters).toEqual(expectedLetters);
    expect(result.error).toBe(null);
  });

  it('should find the correct path for STRAIGHT_THROUGH_INTERSECTIONS', () => {
    const map2D = equalizeMapRows(MAPS.STRAIGHT_THROUGH_INTERSECTIONS);
    const pathString = '@|A+---B--+|+--C-+|-||+---D--+|x';
    const collectedLetters = 'ABCD';
    const expectedPath = pathString.split('');
    const expectedLetters = collectedLetters.split('');
    const result = findPath(map2D);
    expect(result.path).toEqual(expectedPath);
    expect(result.collectedLetters).toEqual(expectedLetters);
    expect(result.error).toBe(null);
  });

  it('should find the correct path for LETTERS_ON_TURNS', () => {
    const map2D = equalizeMapRows(MAPS.LETTERS_ON_TURNS);
    const pathString = '@---A---+|||C---+|+-B-x';
    const collectedLetters = 'ACB';
    const expectedPath = pathString.split('');
    const expectedLetters = collectedLetters.split('');
    const result = findPath(map2D);
    expect(result.path).toEqual(expectedPath);
    expect(result.collectedLetters).toEqual(expectedLetters);
    expect(result.error).toBe(null);
  });

  it('should find the correct path for NO_DUPLICATE_LETTERS', () => {
    const map2D = equalizeMapRows(MAPS.NO_DUPLICATE_LETTERS);
    const pathString = '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x';
    const collectedLetters = 'GOONIES';
    const expectedPath = pathString.split('');
    const expectedLetters = collectedLetters.split('');
    const result = findPath(map2D);
    expect(result.path).toEqual(expectedPath);
    expect(result.collectedLetters).toEqual(expectedLetters);
    expect(result.error).toBe(null);
  });

  it('should find the correct path for COMPACT_SPACE', () => {
    const map2D = equalizeMapRows(MAPS.COMPACT_SPACE);
    const pathString = '@B+++B|+-L-+A+++A-+Hx';
    const collectedLetters = 'BLAH';
    const expectedPath = pathString.split('');
    const expectedLetters = collectedLetters.split('');
    const result = findPath(map2D);
    expect(result.path).toEqual(expectedPath);
    expect(result.collectedLetters).toEqual(expectedLetters);
    expect(result.error).toBe(null);
  });

  it('should find the correct path for IGNORE_AFTER_END', () => {
    const map2D = equalizeMapRows(MAPS.IGNORE_AFTER_END);
    const pathString = '@-A--+|+-B--x';
    const collectedLetters = 'AB';
    const expectedPath = pathString.split('');
    const expectedLetters = collectedLetters.split('');
    const result = findPath(map2D);
    expect(result.path).toEqual(expectedPath);
    expect(result.collectedLetters).toEqual(expectedLetters);
    expect(result.error).toBe(null);
  });

  // Tests for non-working maps
  it('should return an error for MISSING_START', () => {
    const map2D = equalizeMapRows(MAPS.MISSING_START);
    const result = findPath(map2D);
    expect(result.error).toBe('Error');
  });

  it('should return an error for MISSING_END', () => {
    const map2D = equalizeMapRows(MAPS.MISSING_END);
    const result = findPath(map2D);
    expect(result.error).toBe('Error');
  });

  it('should return an error for MULTIPLE_STARTS_V1', () => {
    const map2D = equalizeMapRows(MAPS.MULTIPLE_STARTS_V1);
    const result = findPath(map2D);
    expect(result.error).toBe('Error');
  });

  it('should return an error for MULTIPLE_STARTS_V2', () => {
    const map2D = equalizeMapRows(MAPS.MULTIPLE_STARTS_V2);
    const result = findPath(map2D);
    expect(result.error).toBe('Error');
  });

  it('should return an error for MULTIPLE_STARTS_V3', () => {
    const map2D = equalizeMapRows(MAPS.MULTIPLE_STARTS_V3);
    const result = findPath(map2D);
    expect(result.error).toBe('Error');
  });

  it('should return an error for FORK_IN_PATH', () => {
    const map2D = equalizeMapRows(MAPS.FORK_IN_PATH);
    const result = findPath(map2D);
    expect(result.error).toBe('Error');
  });

  it('should return an error for BROKEN_PATH', () => {
    const map2D = equalizeMapRows(MAPS.BROKEN_PATH);
    const result = findPath(map2D);
    expect(result.error).toBe('Error');
  });

  it('should return an error for MULTIPLE_STARTING_PATHS', () => {
    const map2D = equalizeMapRows(MAPS.MULTIPLE_STARTING_PATHS);
    const result = findPath(map2D);
    expect(result.error).toBe('Error');
  });

  it('should return an error for FAKE_TURN', () => {
    const map2D = equalizeMapRows(MAPS.FAKE_TURN);
    const result = findPath(map2D);
    expect(result.error).toBe('Error');
  });
});