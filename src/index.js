/* eslint-disable no-underscore-dangle */

import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import _ from 'lodash';

const getPath = (file) => path.resolve(process.cwd(), file);
const genDiff = (beforeName, afterName) => {
  const beforePath = getPath(beforeName);
  const afterPath = getPath(afterName);
  let beforeFile;
  let afterFile;
  const extension = path.extname(beforePath);
  if (extension === '.json') {
    beforeFile = JSON.parse(fs.readFileSync(beforePath, { encoding: 'utf-8' }));
  } else if (extension === '.yml') {
    beforeFile = yaml.safeLoad(fs.readFileSync(beforePath, { encoding: 'utf-8' }));
  }
  if (extension === '.json') {
    afterFile = JSON.parse(fs.readFileSync(afterPath, { encoding: 'utf-8' }));
  } else if (extension === '.yml') {
    afterFile = yaml.safeLoad(fs.readFileSync(afterPath, { encoding: 'utf-8' }));
    console.log(beforeFile);
  }
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
