import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
};

const parse = (file, format) => parsers[format](file);
export default parse;
