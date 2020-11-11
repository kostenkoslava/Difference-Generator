import formatStylish from './formatStylish.js';
import formatPlain from './formatPlain.js';
import formatJson from './formatJson.js';

export default (formatterName) => {
  const formatters = {
    stylish: formatStylish,
    plain: formatPlain,
    json: formatJson,

  };
  return formatters[formatterName];
};
