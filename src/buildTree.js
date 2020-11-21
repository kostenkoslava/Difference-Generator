import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const uniqueKeys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  return uniqueKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { name: key, value: obj2[key], type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { name: key, value: obj1[key], type: 'deleted' };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const children = buildTree(obj1[key], obj2[key]);
      return { name: key, children, type: 'nested' };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        name: key,
        value1: obj1[key],
        value2: obj2[key],
        type: 'changed',
      };
    }
    return { name: key, value: obj1[key], type: 'unchanged' };
  });
};
export default buildTree;
