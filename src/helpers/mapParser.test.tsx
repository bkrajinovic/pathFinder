import { equalizeMapRows } from 'src/helpers/mapModifiers';
import { MapArray } from 'src/shared/types';

describe('equalizeMapRows', () => {
  it('should normalize a map with rows of different lengths', () => {
    const inputMap: MapArray = [
      ['@', '-', 'A'],
      [' ', '|', 'B', '-'],
      ['x']
    ];
    const expectedMap: MapArray = [
      ['@', '-', 'A', ' '],
      [' ', '|', 'B', '-'],
      ['x', ' ', ' ', ' ']
    ];
    const result = equalizeMapRows(inputMap);
    expect(result).toEqual(expectedMap);
  });

  it('should return the same map if all rows are of equal length', () => {
    const inputMap: MapArray = [
      ['@', '-', 'A', ' '],
      [' ', '|', 'B', '-'],
      ['x', ' ', ' ', ' ']
    ];
    const expectedMap: MapArray = [
      ['@', '-', 'A', ' '],
      [' ', '|', 'B', '-'],
      ['x', ' ', ' ', ' ']
    ];
    const result = equalizeMapRows(inputMap);
    expect(result).toEqual(expectedMap);
  });

  it('should handle an empty map', () => {
    const inputMap: MapArray = [];
    const expectedMap: MapArray = [];
    const result = equalizeMapRows(inputMap);
    expect(result).toEqual(expectedMap);
  });

  it('should handle a map with a single row', () => {
    const inputMap: MapArray = [['@', '-', 'A']];
    const expectedMap: MapArray = [['@', '-', 'A']];
    const result = equalizeMapRows(inputMap);
    expect(result).toEqual(expectedMap);
  });

  it('should handle a map with rows of varying lengths including empty rows', () => {
    const inputMap: MapArray = [
      ['@', '-', 'A'],
      [],
      ['x', ' ', 'B']
    ];
    const expectedMap: MapArray = [
      ['@', '-', 'A'],
      [' ', ' ', ' '],
      ['x', ' ', 'B']
    ];
    const result = equalizeMapRows(inputMap);
    expect(result).toEqual(expectedMap);
  });

  it('should handle a map with all empty rows', () => {
    const inputMap: MapArray = [
      [],
      [],
      []
    ];
    const expectedMap: MapArray = [
      [],
      [],
      []
    ];
    const result = equalizeMapRows(inputMap);
    expect(result).toEqual(expectedMap);
  });

  it('should handle a map with a single empty row', () => {
    const inputMap: MapArray = [[]];
    const expectedMap: MapArray = [[]];
    const result = equalizeMapRows(inputMap);
    expect(result).toEqual(expectedMap);
  });

  it('should handle a map with a mix of characters and spaces', () => {
    const inputMap: MapArray = [
      ['@', '-', 'A', ' '],
      [' ', '|', ' ', 'B'],
      ['x', ' ', ' ', ' ']
    ];
    const expectedMap: MapArray = [
      ['@', '-', 'A', ' '],
      [' ', '|', ' ', 'B'],
      ['x', ' ', ' ', ' ']
    ];
    const result = equalizeMapRows(inputMap);
    expect(result).toEqual(expectedMap);
  });

  it('should handle a map with only spaces', () => {
    const inputMap: MapArray = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
    const expectedMap: MapArray = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
    const result = equalizeMapRows(inputMap);
    expect(result).toEqual(expectedMap);
  });
});
