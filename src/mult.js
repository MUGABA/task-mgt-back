import multer from "multer";
import config from "config";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${config.get("storageUrl")}`);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 2000000 } });

export default upload;
