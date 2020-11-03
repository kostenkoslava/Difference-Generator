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
describe('stylish format', () => {
  test('json files', () => {
    const expected = readFile('stylish.txt');
    const before = getFixturePath('before.json');
    const after = getFixturePath('after.json');
    const result = genDiff(before, after);
    expect(result).toEqual(expected);
  });
  test('yml files', () => {
    const expected = readFile('stylish.txt');
    const before = getFixturePath('before.yml');
    const after = getFixturePath('after.yml');
    const result = genDiff(before, after);
    expect(result).toEqual(expected);
  });
});
describe('plain format', () => {
  test('json files', () => {
    const expected = readFile('plain.txt');
    const before = getFixturePath('before.json');
    const after = getFixturePath('after.json');
    const result = genDiff(before, after, 'plain');
    expect(result).toEqual(expected);
  });
  test('yml files', () => {
    const expected = readFile('plain.txt');
    const before = getFixturePath('before.yml');
    const after = getFixturePath('after.yml');
    const result = genDiff(before, after, 'plain');
    expect(result).toEqual(expected);
  });
});
describe('json format', () => {
  test('json files', () => {
    const expected = readFile('json.txt');
    const before = getFixturePath('before.json');
    const after = getFixturePath('after.json');
    const result = genDiff(before, after, 'json');
    expect(result).toEqual(expected);
  });
  test('yml files', () => {
    const expected = readFile('json.txt');
    const before = getFixturePath('before.yml');
    const after = getFixturePath('after.yml');
    const result = genDiff(before, after, 'json');
    expect(result).toEqual(expected);
  });
});
