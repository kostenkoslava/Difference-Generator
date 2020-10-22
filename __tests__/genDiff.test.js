/* eslint-disable no-underscore-dangle */

import { expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), { encoding: 'utf-8' });
test('main flow', () => {
  const jsonComparingResult = readFile('jsonComparingResult.txt').toString().trim();
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');
  const result = genDiff(before, after);
  expect(result).toBe(jsonComparingResult);
});
