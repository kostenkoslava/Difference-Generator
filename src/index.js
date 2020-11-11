import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import format from './formatters/index.js';
import findDiffs from './findDiffs.js';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFile = (filepath) => fs.readFileSync(getPath(filepath), { encoding: 'utf-8' });

const genDiff = (file1Path, file2Path, formatter = 'stylish') => {
  const extension = path.extname(file1Path).slice(1) || 'json';
  const file1Data = parse(readFile(file1Path), extension);
  const file2Data = parse(readFile(file2Path), extension);
  const diffTree = findDiffs(file1Data, file2Data);
  const render = format(formatter);
  return render(diffTree);
};
export default genDiff;
