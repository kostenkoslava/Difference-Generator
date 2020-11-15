const formatValue = (value) => {
  const typeOfValue = (value !== null) ? typeof value : value;
  switch (typeOfValue) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    default:
      return value;
  }
};
const plain = (config) => {
  const iter = (diffTree, path = '') => diffTree.map((diff) => {
    const currentPath = (path) ? path.concat(`.${diff.name}`) : diff.name;
    switch (diff.type) {
      case 'nested':
        return iter(diff.children, currentPath);
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(diff.value)}\n`;
      case 'deleted':
        return `Property '${currentPath}' was removed\n`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(diff.file1Value)} to ${formatValue(diff.file2Value)}\n`;
      default:
    }
    return '';
  }).join('');

  return iter(config);
};
export default plain;
