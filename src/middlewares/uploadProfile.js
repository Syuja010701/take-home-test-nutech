const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter(req, file, cb) {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    console.log("File MIME type:", allowed);
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Format Image tidak sesuai"));
    }
    cb(null, true);
  }
});

module.exports = upload;
