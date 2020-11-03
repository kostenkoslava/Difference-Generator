import stylishFormat from './stylishFormat.js';
import plainFormat from './plainFormat.js';
import jsonFormat from './jsonFormat.js';

export default (formatterName) => {
  const formatters = {
    stylish: stylishFormat,
    plain: plainFormat,
    json: jsonFormat,

  };
  return formatters[formatterName];
};
