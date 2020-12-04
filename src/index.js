import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import format from './formatters/index.js';
import buildTree from './buildTree.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filepath) => fs.readFileSync(getPath(filepath), { encoding: 'utf-8' });

const getFormat = (filename) => path.extname(filename).slice(1);

const genDiff = (file1Path, file2Path, formatter = 'stylish') => {
  const parsedData1 = parse(readFile(file1Path), getFormat(file1Path));
  const parsedData2 = parse(readFile(file2Path), getFormat(file2Path));
  const diffTree = buildTree(parsedData1, parsedData2);
  return format(diffTree, formatter);
};
export default genDiff;
