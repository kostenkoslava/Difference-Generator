import _ from 'lodash';

const makeConfig = (name, value, type) => ((type === 'nested') ? {
  name,
  children: value,
  type,
}
  : {
    name,
    value,
    type,
  });
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
      type: 'changed',
    };
  });
};
export default findDiffs;
