/* eslint-disable no-underscore-dangle */

import _ from 'lodash';
import parse from './parsers';

const genDiff = (beforeName, afterName) => {
  const beforeData = parse(beforeName);
  const afterData = parse(afterName);
  const beforeKeys = Object.keys(beforeData);
  const afterKeys = Object.keys(afterData);
  const uniqueKeys = _.union(beforeKeys, afterKeys).sort();
  const result = ['{\n'];
  const added = '  + ';
  const deleted = '  - ';
  const unchanged = '    ';
  uniqueKeys.forEach((key) => {
    if (!_.has(beforeData, key)) {
      result.push(added, key, ': ', String(afterData[key]), '\n');
    } else if (!_.has(afterData, key)) {
      result.push(deleted, key, ': ', String(beforeData[key]), '\n');
    } else if (beforeData[key] !== afterData[key]) {
      result.push(deleted, key, ': ', String(beforeData[key]), '\n');
      result.push(added, key, ': ', String(afterData[key]), '\n');
    } else {
      result.push(unchanged, key, ': ', String(beforeData[key]), '\n');
    }
  });
  result.push('}');
  return result.join('');
};
export default genDiff;
