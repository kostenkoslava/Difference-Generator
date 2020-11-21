/* eslint-disable no-underscore-dangle */

import { describe, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const extensions = ['json', 'yml'];
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFixtureFile = (name, extension) => getFixturePath(`${name}.${extension}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), { encoding: 'utf-8' });

describe('comparing two configuration files', () => {
  const expectedResult = {
    stylish: readFile('stylish.txt'),
    plain: readFile('plain.txt'),
    json: readFile('json.txt'),
  };
  test.each(extensions)('%s files', (extension) => {
    expect(genDiff(getFixtureFile('file1', extension), getFixtureFile('file2', extension)))
      .toEqual(expectedResult.stylish);
    expect(genDiff(getFixtureFile('file1', extension), getFixtureFile('file2', extension), 'plain'))
      .toEqual(expectedResult.plain);
    expect(genDiff(getFixtureFile('file1', extension), getFixtureFile('file2', extension), 'json'))
      .toEqual(expectedResult.json);
  });
  test.each(extensions)('is valid JSON output (%s files)', (extension) => {
    expect(() => JSON.parse(genDiff(
      getFixtureFile('file1', extension),
      getFixtureFile('file2', extension),
      'json',
    ))).not.toThrow();
  });
});
