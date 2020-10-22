import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFile = (filename) => fs.readFileSync(getPath(filename), { encoding: 'utf-8' });

const parser = (filename) => {
  const format = path.extname(getPath(filename));
  if (format === '.json' || format === '') {
    return JSON.parse(readFile(filename));
  }
  if (format === '.yml') {
    return yaml.safeLoad(readFile(filename));
  }
  return undefined;
};
export default parser;
