const multer = require("multer");
const { getExtensionFile } = require("./../../utils/getExtensionFile");

const uploadSingleImage = (imageType) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./public/images/${imageType}`);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });

  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const imgExtensionList = ["png", "jpg", "jpeg"];
      const fileExtension = getExtensionFile(file.originalname);
      if (imgExtensionList.includes(fileExtension)) {
        cb(null, true);
      } else {
        cb(new Error("File extension is not valid"));
      }
    },
  });

  return upload.single(imageType);
};

module.exports = {
  uploadSingleImage,
};
