import { findPath } from 'src/helpers/pathFinder';
import { handleParseMap } from 'src/helpers/mapParser';
import { MAPS } from 'src/constants/maps';

describe('findPath', () => {
  it('should find the correct path for BASIC_EXAMPLE', () => {
    const map2D = handleParseMap(MAPS.BASIC_EXAMPLE);
    const pathString = '@---A---+|C|+---+|+-B-x';
    const collectedLetters = 'ACB';
    const expectedPath = pathString.split('');
    const expectedLetters = collectedLetters.split('');
    const result = findPath(map2D);
    expect(result.path).toEqual(expectedPath);
    expect(result.collectedLetters).toEqual(expectedLetters);
  });

  it('should find the correct path for STRAIGHT_THROUGH_INTERSECTIONS', () => {
    const map2D = handleParseMap(MAPS.STRAIGHT_THROUGH_INTERSECTIONS);
    const pathString = '@|A+---B--+|+--C-+|-||+---D--+|x';
    const collectedLetters = 'ABCD';
    const expectedPath = pathString.split('');
    const expectedLetters = collectedLetters.split('');
    const result = findPath(map2D);
    expect(result.path).toEqual(expectedPath);
    expect(result.collectedLetters).toEqual(expectedLetters);
  });

  it('should find the correct path for LETTERS_ON_TURNS', () => {
    const map2D = handleParseMap(MAPS.LETTERS_ON_TURNS);
    const pathString = '@---A---+|||C---+|+-B-x';
    const collectedLetters = 'ACB';
    const expectedPath = pathString.split('');
    const expectedLetters = collectedLetters.split('');
    const result = findPath(map2D);
    expect(result.path).toEqual(expectedPath);
    expect(result.collectedLetters).toEqual(expectedLetters);
  });

  it('should find the correct path for NO_DUPLICATE_LETTERS', () => {
    const map2D = handleParseMap(MAPS.NO_DUPLICATE_LETTERS);
    const pathString = '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x';
    const collectedLetters = 'GOONIES';
    const expectedPath = pathString.split('');
    const expectedLetters = collectedLetters.split('');
    const result = findPath(map2D);
    expect(result.path).toEqual(expectedPath);
    expect(result.collectedLetters).toEqual(expectedLetters);
  });

  it('should find the correct path for COMPACT_SPACE', () => {
    const map2D = handleParseMap(MAPS.COMPACT_SPACE);
    const pathString = '@B+++B|+-L-+A+++A-+Hx';
    const collectedLetters = 'BLAH';
    const expectedPath = pathString.split('');
    const expectedLetters = collectedLetters.split('');
    const result = findPath(map2D);
    expect(result.path).toEqual(expectedPath);
    expect(result.collectedLetters).toEqual(expectedLetters);
  });

  it('should find the correct path for IGNORE_AFTER_END', () => {
    const map2D = handleParseMap(MAPS.IGNORE_AFTER_END);
    const pathString = '@-A--+|+-B--x';
    const collectedLetters = 'AB';
    const expectedPath = pathString.split('');
    const expectedLetters = collectedLetters.split('');
    const result = findPath(map2D);
    expect(result.path).toEqual(expectedPath);
    expect(result.collectedLetters).toEqual(expectedLetters);
  });
});