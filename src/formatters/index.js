import stylish from './stylish.js';
import plain from './plain.js';

export default (formatName) => {
  const formatters = {
    stylish,
    plain,
  };
  return formatters[formatName];
};
