/* eslint-disable no-underscore-dangle */

import { describe, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFixtureFile = (name, format) => getFixturePath(`${name}.${format}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), { encoding: 'utf-8' });
const formats = ['json', 'yml'];

describe('comparing two configuration files', () => {
  const expectedResult = {
    stylish: readFile('stylish.txt'),
    plain: readFile('plain.txt'),
    json: readFile('json.txt'),
  };
  test.each(formats)('%s files', (format) => {
    const filepath1 = getFixtureFile('file1', format);
    const filepath2 = getFixtureFile('file2', format);
    expect(genDiff(filepath1, filepath2)).toEqual(expectedResult.stylish);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedResult.stylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedResult.plain);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedResult.json);
  });
  test.each(formats)('is valid JSON output (%s files)', (format) => {
    expect(() => JSON.parse(genDiff(
      getFixtureFile('file1', format),
      getFixtureFile('file2', format),
      'json',
    ))).not.toThrow();
  });
});
