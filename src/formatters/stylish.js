const formatValue = (value, indent) => {
  if (typeof value !== 'object' || !value) {
    return value;
  }
  const extraSpaces = 4;
  const entries = Object.entries(value);
  const formattedObject = entries.map((pair) => `${' '.repeat(indent + extraSpaces)}  ${pair[0]}: ${formatValue(pair[1], (indent + extraSpaces))}\n`)
    .join('');
  return `{\n${formattedObject}${' '.repeat((extraSpaces + indent) - 2)}}`;
};
const stylish = (config) => {
  const iter = (data, depth) => {
    const spaces = 2;
    const indent = spaces * depth;
    const formattedData = data.map((diff) => {
      switch (diff.change) {
        case 'nested':
          return `${' '.repeat(indent)}  ${diff.name}: ${iter(diff.value, depth + 2)}\n`;
        case 'added':
          return `${' '.repeat(indent)}+ ${diff.name}: ${formatValue(diff.value, indent)}\n`;
        case 'deleted':
          return `${' '.repeat(indent)}- ${diff.name}: ${formatValue(diff.value, indent)}\n`;
        case 'changed':
          return `${' '.repeat(indent)}- ${diff.name}: ${formatValue(diff.beforeValue, indent)}\n${' '.repeat(indent)}+ ${diff.name}: ${formatValue(diff.afterValue, indent)}\n`;
        default:
          return `${' '.repeat(indent)}  ${diff.name}: ${diff.value}\n`;
      }
    }).join('');
    return `{\n${formattedData}${' '.repeat(indent - 2)}}`;
  };
  return iter(config, 1);
};
export default stylish;
