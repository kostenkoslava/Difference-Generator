/* eslint-disable no-underscore-dangle */

import { describe, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), { encoding: 'utf-8' });

const testData = [
  ['stylish', readFile('stylish.txt')],
  ['plain', readFile('plain.txt')],
  ['json', readFile('json.txt')]];

describe('comparing two configuration files', () => {
  const file1Json = getFixturePath('file1.json');
  const file2Json = getFixturePath('file2.json');
  const file1Yml = getFixturePath('file1.yml');
  const file2Yml = getFixturePath('file2.yml');
  test.each(testData)('%s format', (format, result) => {
    expect(genDiff(file1Yml, file2Yml, format)).toEqual(result);
    expect(genDiff(file1Json, file2Json, format)).toEqual(result);
  });
  test('is valid JSON', () => {
    expect(() => [JSON.parse(genDiff(file1Yml, file2Yml, 'json')),
      JSON.parse(genDiff(file1Json, file2Json, 'json'))]).not.toThrow();
  });
});
