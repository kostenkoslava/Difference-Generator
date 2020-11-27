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
  const iter = (tree, path = []) => tree.map((node) => {
    const currentPath = [...path, node.name];
    switch (node.type) {
      case 'nested':
        return iter(node.children, currentPath);
      case 'added':
        return `Property '${currentPath.join('.')}' was added with value: ${formatValue(node.value)}`;
      case 'deleted':
        return `Property '${currentPath.join('.')}' was removed`;
      case 'changed':
        return `Property '${currentPath.join('.')}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
      case 'unchanged':
        return false;
      default:
        throw new Error(`This type (${node.type} is not supported!)`);
    }
  }).filter((node) => node).flat();

  return iter(diffTree).join('\n');
};
export default formatPlain;
