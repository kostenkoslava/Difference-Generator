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
const formatPlain = (diffTree) => {
  const iter = (tree, path = '') => tree.map((node) => {
    const currentPath = (path) ? `${path}.${node.name}` : node.name;
    switch (node.type) {
      case 'nested':
        return iter(node.children, currentPath);
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`;
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
      case 'unchanged':
        return false;
      default:
        throw new Error('Type is not readable!');
    }
  }).filter((node) => node)
    .join('\n');

  return iter(diffTree);
};
export default formatPlain;
