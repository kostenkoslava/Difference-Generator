const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return (typeof value !== 'object' || !value) ? value : '[complex value]';
};
const plain = (config, path = '') => {
  const result = config.map((diff) => {
    const currentPath = (path) ? path.concat(`.${diff.name}`) : diff.name;
    switch (diff.type) {
      case 'nested':
        return plain(diff.children, currentPath);
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(diff.value)}\n`;
      case 'deleted':
        return `Property '${currentPath}' was removed\n`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(diff.beforeValue)} to ${formatValue(diff.afterValue)}\n`;
      default:
    }
    return '';
  }).join('');
  return result;
};
export default plain;
