import yaml from 'js-yaml';

const parse = (file, format) => {
  if (format === '.json' || format === '') {
    return JSON.parse(file);
  }
  if (format === '.yml') {
    return yaml.load(file);
  }
  return undefined;
};
export default parse;
