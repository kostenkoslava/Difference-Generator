import _ from 'lodash';

const findDiffs = (file1, file2) => {
  const beforeKeys = Object.keys(file1);
  const afterKeys = Object.keys(file2);
  const uniqueKeys = _.union(beforeKeys, afterKeys).sort();
  return uniqueKeys.map((key) => {
    if (!_.has(file1, key)) {
      return { name: key, value: file2[key], type: 'added' };
    }
    if (!_.has(file2, key)) {
      return { name: key, value: file1[key], type: 'deleted' };
    }
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      const children = findDiffs(file1[key], file2[key]).flat();
      return { name: key, children, type: 'nested' };
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return {
        name: key,
        beforeValue: file1[key],
        afterValue: file2[key],
        type: 'changed',
      };
    }
    return { name: key, value: file1[key], type: 'unchanged' };
  });
};
export default findDiffs;
