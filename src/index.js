/* eslint-disable no-underscore-dangle */

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import format from './format.js';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFile = (filename) => fs.readFileSync(getPath(filename), { encoding: 'utf-8' });

const makeConfig = (name, value, change) => {
  const config = {
    name,
    value,
    change,
  };
  return config;
};
const findDiffs = (before, after) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const uniqueKeys = _.union(beforeKeys, afterKeys).sort();
  return uniqueKeys.map((key) => {
    if (!_.has(before, key)) {
      return makeConfig(key, after[key], 'added');
    }
    if (!_.has(after, key)) {
      return makeConfig(key, before[key], 'deleted');
    }
    if (typeof before[key] === 'object' && typeof after[key] === 'object') {
      const children = findDiffs(before[key], after[key]);
      return makeConfig(key, children.flat(), 'nested');
    }
    if (before[key] === after[key]) {
      return makeConfig(key, before[key], 'unchanged');
    }
    return {
      name: key,
      beforeValue: before[key],
      afterValue: after[key],
      change: 'changed',
    };
  });
};
const genDiff = (beforePath, afterPath, formatter = 'stylish') => {
  const beforeData = parse(readFile(beforePath), path.extname(beforePath));
  const afterData = parse(readFile(afterPath), path.extname(afterPath));
  const diffTree = findDiffs(beforeData, afterData);
  return (formatter === 'stylish') ? format(diffTree) : null;
};
export default genDiff;
