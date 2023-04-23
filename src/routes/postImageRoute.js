const express = require("express");
const { postImageByUser } = require("../controllers/postImageController");
const postImageRouter = express.Router();
const multer = require("multer");
const { authentication } = require("../controllers/authController");
const storage = multer.diskStorage({
  destination: (req, file, callback) =>
    callback(null, process.cwd() + "/public/img"),
  filename: (req, file, callback) => {
    // datetime
    // milisecond
    let newName = Date.now() + "_" + file.originalname;
    // 165323912839_file.jpg

    callback(null, newName);
  },
});

const upload = multer({ storage });
// tạo API
// API get food
// homeRouter.post("/login", loginUser);

// API create food
postImageRouter.post(
  "/post-image-by-user",
  authentication,
  upload.single("file"),
  postImageByUser
);

module.exports = postImageRouter;
