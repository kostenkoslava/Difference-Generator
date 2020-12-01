import _ from 'lodash';

const defaultIndent = 4;
const extraIndent = 2;
const makeIndent = (indent, extraSpaces = 0) => ' '.repeat(indent - extraSpaces);

const formatValue = (nodeValue, indent) => {
  if (!_.isObject(nodeValue)) {
    return nodeValue;
  }

  const result = Object.entries(nodeValue)
    .map(([key, value]) => {
      const formattedValue = formatValue(value, indent + defaultIndent);
      return `${makeIndent(indent, extraIndent)}  ${key}: ${formattedValue}`;
    }).join('\n');

  return `{\n${result}\n${makeIndent(indent, defaultIndent)}}`;
};

export default (diffTree) => {
  const iter = (nodes, indent) => {
    const result = nodes.flatMap((node) => {
      switch (node.type) {
        case 'unchanged':
          return `${makeIndent(indent)}${node.name}: ${formatValue(node.value, indent + defaultIndent)}`;
        case 'changed':
          return [
            `${makeIndent(indent, extraIndent)}- ${node.name}: ${formatValue(node.value1, indent + defaultIndent)}`,
            `${makeIndent(indent, extraIndent)}+ ${node.name}: ${formatValue(node.value2, indent + defaultIndent)}`,
          ];
        case 'added':
          return `${makeIndent(indent, extraIndent)}+ ${node.name}: ${formatValue(node.value, indent + defaultIndent)}`;
        case 'deleted':
          return `${makeIndent(indent, extraIndent)}- ${node.name}: ${formatValue(node.value, indent + defaultIndent)}`;
        case 'nested':
          return `${makeIndent(indent)}${node.name}: ${iter(node.children, indent + defaultIndent)}`;
        default:
          throw new Error(`This type (${node.type} is not supported!)`);
      }
    });
    return `{\n${result.join('\n')}\n${makeIndent(indent, defaultIndent)}}`;
  };
  return iter(diffTree, defaultIndent);
};
