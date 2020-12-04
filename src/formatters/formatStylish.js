import _ from 'lodash';

const makeIndent = (depth, extraSpaces = 2) => ' '.repeat(depth * 4 - extraSpaces);

const formatValue = (nodeValue, depth) => {
  if (!_.isObject(nodeValue)) {
    return nodeValue;
  }

  const result = Object.entries(nodeValue)
    .map(([key, value]) => {
      const formattedValue = formatValue(value, depth + 1);
      return `${makeIndent(depth)}  ${key}: ${formattedValue}`;
    }).join('\n');

  return `{\n${result}\n${makeIndent(depth, 4)}}`;
};

export default (diffTree) => {
  const iter = (nodes, depth) => {
    const result = nodes.flatMap((node) => {
      switch (node.type) {
        case 'unchanged':
          return `${makeIndent(depth)}  ${node.name}: ${formatValue(node.value, depth + 1)}`;
        case 'changed':
          return [
            `${makeIndent(depth)}- ${node.name}: ${formatValue(node.value1, depth + 1)}`,
            `${makeIndent(depth)}+ ${node.name}: ${formatValue(node.value2, depth + 1)}`,
          ];
        case 'added':
          return `${makeIndent(depth)}+ ${node.name}: ${formatValue(node.value, depth + 1)}`;
        case 'deleted':
          return `${makeIndent(depth)}- ${node.name}: ${formatValue(node.value, depth + 1)}`;
        case 'nested':
          return `${makeIndent(depth)}  ${node.name}: ${iter(node.children, depth + 1)}`;
        default:
          throw new Error(`This type (${node.type} is not supported!)`);
      }
    });
    return `{\n${result.join('\n')}\n${makeIndent(depth, 4)}}`;
  };
  return iter(diffTree, 1);
};
