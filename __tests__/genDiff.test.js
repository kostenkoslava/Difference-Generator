import { expect } from '@jest/globals';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (file) => path.join('__fixtures__', file);
test('main flow', () => {
  const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const result = genDiff(filePath1, filePath2);
  expect(result).toEqual(expectedResult);
});
