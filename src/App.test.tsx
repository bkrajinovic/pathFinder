import { findPath } from 'src/helpers/pathFinder';
import { handleParseMap } from 'src/helpers/mapParser';
import { MAPS } from 'src/constants/maps';

describe('findPath', () => {
  it('should find the correct path for BASIC_EXAMPLE', () => {
    const map2D = handleParseMap(MAPS.BASIC_EXAMPLE);
    const pathString = '@---A---+|C|+---+|+-B-x';
    const expectedPath = pathString.split('');
    const result = findPath(map2D);
    expect(result).toEqual(expectedPath);
  });

  it('should find the correct path for STRAIGHT_THROUGH_INTERSECTIONS', () => {
    const map2D = handleParseMap(MAPS.STRAIGHT_THROUGH_INTERSECTIONS);
    const pathString = '@|A+---B--+|+--C-+|-||+---D--+|x';
    const expectedPath = pathString.split('');
    const result = findPath(map2D);
    expect(result).toEqual(expectedPath);
  });

  it('should find the correct path for LETTERS_ON_TURNS', () => {
    const map2D = handleParseMap(MAPS.LETTERS_ON_TURNS);
    const pathString = '@---A---+|||C---+|+-B-x';
    const expectedPath = pathString.split('');
    const result = findPath(map2D);
    expect(result).toEqual(expectedPath);
  });

  it('should find the correct path for NO_DUPLICATE_LETTERS', () => {
    const map2D = handleParseMap(MAPS.NO_DUPLICATE_LETTERS);
    const pathString = '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x';
    const expectedPath = pathString.split('');
    const result = findPath(map2D);
    expect(result).toEqual(expectedPath);
  });

  it('should find the correct path for COMPACT_SPACE', () => {
    const map2D = handleParseMap(MAPS.COMPACT_SPACE);
    const pathString = '@B+++B|+-L-+A+++A-+Hx';
    const expectedPath = pathString.split('');
    const result = findPath(map2D);
    expect(result).toEqual(expectedPath);
  });

  it('should find the correct path for IGNORE_AFTER_END', () => {
    const map2D = handleParseMap(MAPS.IGNORE_AFTER_END);
    const pathString = '@-A--+|+-B--x';
    const expectedPath = pathString.split('');
    const result = findPath(map2D);
    expect(result).toEqual(expectedPath);
  });
});