const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg'
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mimetype');

    if (isValid) {
      error = null;
    }
    callback(error, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, `${name}-${Date.now()}.${ext}`);
  }
});

module.exports = multer({ storage });
