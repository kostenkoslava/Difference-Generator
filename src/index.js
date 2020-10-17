/* eslint-disable no-underscore-dangle */

import path from 'path';
import os from 'os';
import fs from 'fs';
import { fileURLToPath } from 'url';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (file) => path.join(process.cwd(), file);
const genDiff = (filename1, filename2) => {
  const filePath1 = getFixturePath(filename1);
  const filePath2 = getFixturePath(filename2);
  const file1 = JSON.parse(fs.readFileSync(filePath1, { encoding: 'utf-8' }));
  const file2 = JSON.parse(fs.readFileSync(filePath2, { encoding: 'utf-8' }));
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2).sort();
  const result = ['{\n'];
  const added = '  + ';
  const deleted = '  - ';
  const unchanged = '    ';
  keys.forEach((key) => {
    if (!_.has(file1, key)) {
      result.push(added, key, ': ', String(file2[key]), '\n');
    } else if (!_.has(file2, key)) {
      result.push(deleted, key, ': ', String(file1[key]), '\n');
    } else if (file1[key] !== file2[key]) {
      result.push(deleted, key, ': ', String(file1[key]), '\n');
      result.push(added, key, ': ', String(file2[key]), '\n');
    } else {
      result.push(unchanged, key, ': ', String(file1[key]), '\n');
    }
  });
  result.push('}');
  return result.join('');
};
export default genDiff;
