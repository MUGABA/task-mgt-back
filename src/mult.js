import multer from "multer";
// import sftpStorage from "multer-sftp";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "/home/nepserv/Desktop/uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// const storage = sftpStorage({
//   sftp: {
//     host: "akuagroup.xyz",
//     port: 1995,
//     username: "rashid",
//     password: "test123",
//   },
//   destination: function (req, file, cb) {
//     cb(null, "/home/akua/html/www.akuagroup.xyz/test-files");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

const upload = multer({ storage: storage, limits: { fileSize: 2000000 } });

export default upload;
