
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const getFixturePath = (file) => path.join(__dirname, '..', '__fixtures__', file);
const gendiff = (filename1, filename2) => {
  const filePath1 = getFixturePath(filename1);
  const filePath2 = getFixturePath(filename2)
  console.log(filePath1, filePath2)
}
export default gendiff;