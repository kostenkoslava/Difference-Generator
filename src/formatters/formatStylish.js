import _ from 'lodash';

const indent = (depth) => '    '.repeat(depth);

const formatValue = (nodeValue, depth) => {
  if (!_.isObject(nodeValue)) {
    return nodeValue;
  }

  const result = Object.keys(nodeValue)
    .map((key) => {
      const value = formatValue(nodeValue[key], depth + 1);
      return `${indent(depth + 2)}${key}: ${value}`;
    }).join('\n');

  return ['{', result, `${indent(depth + 1)}}`].join('\n');
};

export default (diffTree) => {
  const iter = (tree, depth = 0) => {
    const result = tree.flatMap((node) => {
      switch (node.type) {
        case 'unchanged':
          return `    ${indent(depth)}${node.name}: ${formatValue(node.value, depth)}`;
        case 'changed':
          return [
            `  ${indent(depth)}- ${node.name}: ${formatValue(node.value1, depth)}`,
            `  ${indent(depth)}+ ${node.name}: ${formatValue(node.value2, depth)}`,
          ];
        case 'added':
          return `  ${indent(depth)}+ ${node.name}: ${formatValue(node.value, depth)}`;
        case 'deleted':
          return `  ${indent(depth)}- ${node.name}: ${formatValue(node.value, depth)}`;
        case 'nested':
          return `${indent(depth + 1)}${node.name}: {\n${iter(node.children, depth + 1)}\n${indent(depth + 1)}}`;
        default:
          throw new Error('Type is not readable!');
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(diffTree)}\n}`;
};
