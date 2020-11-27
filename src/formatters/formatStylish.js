import _ from 'lodash';

const indent = '    ';
const makeIndent = (depth, prefix = '') => {
  const result = indent.repeat(depth).split('');
  result.splice(result.length - prefix.length, prefix.length, prefix);
  return result.join('');
};

const formatValue = (nodeValue, depth) => {
  if (!_.isObject(nodeValue)) {
    return nodeValue;
  }

  const result = Object.entries(nodeValue)
    .map(([key, value]) => {
      const formattedValue = formatValue(value, depth + 1);
      return `${makeIndent(depth + 1)}${key}: ${formattedValue}`;
    }).join('\n');

  return `{\n${result}\n${makeIndent(depth)}}`;
};

export default (diffTree) => {
  const iter = (tree, depth) => {
    const result = tree.flatMap((node) => {
      switch (node.type) {
        case 'unchanged':
          return `${makeIndent(depth, '  ')}${node.name}: ${formatValue(node.value, depth)}`;
        case 'changed':
          return [
            `${makeIndent(depth, '- ')}${node.name}: ${formatValue(node.value1, depth)}`,
            `${makeIndent(depth, '+ ')}${node.name}: ${formatValue(node.value2, depth)}`,
          ];
        case 'added':
          return `${makeIndent(depth, '+ ')}${node.name}: ${formatValue(node.value, depth)}`;
        case 'deleted':
          return `${makeIndent(depth, '- ')}${node.name}: ${formatValue(node.value, depth)}`;
        case 'nested':
          return `${makeIndent(depth)}${node.name}: ${iter(node.children, depth + 1)}`;
        default:
          throw new Error(`This type (${node.type} is not supported!)`);
      }
    });
    return `{\n${result.join('\n')}\n${makeIndent(depth - 1)}}`;
  };
  return iter(diffTree, 1);
};
