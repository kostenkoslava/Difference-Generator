import yaml from 'js-yaml';

const parse = (file, extension) => {
  const parser = {
    json: JSON.parse,
    yml: yaml.load,
  };
  return parser[extension](file);
};
export default parse;
