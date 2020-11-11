/* eslint-disable no-underscore-dangle */

import { expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), { encoding: 'utf-8' });

const formats = ['stylish', 'plain', 'json'];

const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');
const file1Yml = getFixturePath('file1.yml');
const file2Yml = getFixturePath('file2.yml');

test.each(formats)('comparing two json files with %s format', (format) => {
  const result = readFile(`${format}.txt`);
  expect(genDiff(file1Json, file2Json, format)).toEqual(result);
});
test.each(formats)('comparing two yml files with %s format', (format) => {
  const result = readFile(`${format}.txt`);
  expect(genDiff(file1Yml, file2Yml, format)).toEqual(result);
});
test('is valid JSON', () => {
  const resultJson = JSON.parse(genDiff(file1Json, file2Json, 'json'));
  const resultYml = JSON.parse(genDiff(file1Yml, file2Yml, 'json'));
  expect(typeof resultJson).toEqual('object');
  expect(typeof resultYml).toEqual('object');
});
