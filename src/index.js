/* eslint-disable no-underscore-dangle */

import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const getFixturePath = (file) => path.resolve(process.cwd(), file);
const genDiff = (beforeName, afterName) => {
  const beforePath = getFixturePath(beforeName);
  const afterPath = getFixturePath(afterName);
  const beforeFile = JSON.parse(fs.readFileSync(beforePath, { encoding: 'utf-8' }));
  const afterFile = JSON.parse(fs.readFileSync(afterPath, { encoding: 'utf-8' }));
  const beforeKeys = Object.keys(beforeFile);
  const afterKeys = Object.keys(afterFile);
  const uniqueKeys = _.union(beforeKeys, afterKeys).sort();
  const result = ['{\n'];
  const added = '  + ';
  const deleted = '  - ';
  const unchanged = '    ';
  uniqueKeys.forEach((key) => {
    if (!_.has(beforeFile, key)) {
      result.push(added, key, ': ', String(afterFile[key]), '\n');
    } else if (!_.has(afterFile, key)) {
      result.push(deleted, key, ': ', String(beforeFile[key]), '\n');
    } else if (beforeFile[key] !== afterFile[key]) {
      result.push(deleted, key, ': ', String(beforeFile[key]), '\n');
      result.push(added, key, ': ', String(afterFile[key]), '\n');
    } else {
      result.push(unchanged, key, ': ', String(beforeFile[key]), '\n');
    }
  });
  result.push('}');
  return result.join('');
};
export default genDiff;
