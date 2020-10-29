const formatValue = (value, indent) => {
  if (typeof value !== 'object' || !value) {
    return value;
  }

  const additionalSpaces = 4;
  const entries = Object.entries(value);
  const formattedObject = entries.map((pair) => `${' '.repeat(indent + additionalSpaces)}  ${pair[0]}: ${formatValue(pair[1], (indent + additionalSpaces))}\n`)
    .join('');
  return `{\n${formattedObject}${' '.repeat((additionalSpaces + indent) - 2)}}`;
};
const stylish = (config) => {
  const iter = (data, depth) => {
    const spaces = 2;
    const indent = spaces * depth;
    const formattedData = data.map((diff) => {
      if (diff.change === 'nested') {
        const stylishedChildren = iter(diff.value, depth + 2);
        return `${' '.repeat(indent)}  ${diff.name}: ${stylishedChildren}\n`;
      }
      if (diff.change === 'added') {
        return `${' '.repeat(indent)}+ ${diff.name}: ${formatValue(diff.value, indent)}\n`;
      }
      if (diff.change === 'deleted') {
        return `${' '.repeat(indent)}- ${diff.name}: ${formatValue(diff.value, indent)}\n`;
      }
      if (diff.change === 'changed') {
        return `${' '.repeat(indent)}- ${diff.name}: ${formatValue(diff.beforeValue, indent)}\n${' '.repeat(indent)}+ ${diff.name}: ${formatValue(diff.afterValue, indent)}\n`;
      }
      return `${' '.repeat(indent)}  ${diff.name}: ${diff.value}\n`;
    }).join('');
    return `{\n${formattedData}${' '.repeat(indent - 2)}}`;
  };
  return iter(config, 1);
};
export default stylish;
