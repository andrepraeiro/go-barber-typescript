import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { te } from 'date-fns/locale';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  tmpFolder: tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tempFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const filename = `${fileHash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
};
