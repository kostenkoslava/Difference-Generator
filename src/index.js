
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const getFixturePath = (file) => path.resolve(__dirname, '..', '__fixtures__', file);
const genDiff = (filename1, filename2) => {
  const filePath1 = getFixturePath(filename1);
  const filePath2 = getFixturePath(filename2);
  const file1 = JSON.parse(fs.readFileSync(filePath1, { encoding: 'utf-8' }));
  const file2 = JSON.parse(fs.readFileSync(filePath2, { encoding: 'utf-8' }));
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2).sort();
  const result = {};
  keys.forEach((key) => {
    if (!_.has(file1, key)) {
      result[`+ ${key}`] = file2[key]
    }
  })
  console.log(result)
}
export default genDiff;