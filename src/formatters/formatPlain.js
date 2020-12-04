import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const createPath = (origin, name) => [...origin, name].join('.');

const formatPlain = (diffTree) => {
  const iter = (nodes, paths) => nodes.flatMap((node) => {
    switch (node.type) {
      case 'nested':
        return iter(node.children, [...paths, node.name]);
      case 'added':
        return `Property '${createPath(paths, node.name)}' was added with value: ${formatValue(node.value)}`;
      case 'deleted':
        return `Property '${createPath(paths, node.name)}' was removed`;
      case 'changed':
        return `Property '${createPath(paths, node.name)}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`This type (${node.type} is not supported!)`);
    }
  });

  return iter(diffTree, []).join('\n');
};
export default formatPlain;
