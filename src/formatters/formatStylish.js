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
const formatStylish = (diffTree) => {
  const iter = (tree, depth) => {
    const spaces = 2;
    const indent = spaces * depth;
    const formattedData = tree.map((diff) => {
      switch (diff.type) {
        case 'nested':
          return `${' '.repeat(indent)}  ${diff.name}: ${iter(diff.children, depth + 2)}\n`;
        case 'added':
          return `${' '.repeat(indent)}+ ${diff.name}: ${formatValue(diff.value, indent)}\n`;
        case 'deleted':
          return `${' '.repeat(indent)}- ${diff.name}: ${formatValue(diff.value, indent)}\n`;
        case 'changed':
          return `${' '.repeat(indent)}- ${diff.name}: ${formatValue(diff.file1Value, indent)}\n${' '.repeat(indent)}+ ${diff.name}: ${formatValue(diff.file2Value, indent)}\n`;
        default:
          return `${' '.repeat(indent)}  ${diff.name}: ${diff.value}\n`;
      }
    }).join('');
    return `{\n${formattedData}${' '.repeat(indent - 2)}}`;
  };
  return iter(diffTree, 1);
};
export default formatStylish;
