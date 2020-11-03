/* eslint-disable no-underscore-dangle */

import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import format from './formatters/index.js';
import findDiffs from './findDiffs.js';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFile = (filename) => fs.readFileSync(getPath(filename), { encoding: 'utf-8' });

const genDiff = (beforePath, afterPath, formatter = 'stylish') => {
  const beforeData = parser(readFile(beforePath), path.extname(beforePath));
  const afterData = parser(readFile(afterPath), path.extname(afterPath));
  const diffTree = findDiffs(beforeData, afterData);
  const render = format(formatter);
  return render(diffTree);
};
export default genDiff;
