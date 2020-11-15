import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
};

const parse = (file, extension) => parsers[extension](file);
export default parse;
