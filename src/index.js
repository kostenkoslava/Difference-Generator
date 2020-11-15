import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import format from './formatters/index.js';
import buildTree from './buildTree.js';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFile = (filepath) => fs.readFileSync(getPath(filepath), { encoding: 'utf-8' });

const genDiff = (file1Path, file2Path, formatter = 'stylish') => {
  const fileFormat = path.extname(file1Path).slice(1);
  const file1Data = parse(readFile(file1Path), fileFormat);
  const file2Data = parse(readFile(file2Path), fileFormat);
  const diffTree = buildTree(file1Data, file2Data);
  return format(formatter)(diffTree);
};
export default genDiff;
