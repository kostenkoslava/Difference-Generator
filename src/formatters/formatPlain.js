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

const createPath = (...paths) => paths.filter((path) => path).join('.');

const formatPlain = (diffTree) => {
  const iter = (nodes, paths) => nodes.flatMap((node) => {
    const currentPath = createPath(paths, node.name);
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
        return [];
      default:
        throw new Error(`This type (${node.type} is not supported!)`);
    }
  });

  return iter(diffTree).join('\n');
};
export default formatPlain;
