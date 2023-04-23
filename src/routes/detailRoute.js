const express = require("express");
const detailRouter = express.Router();

const {
  getImageAndUserByIdImage,
  getInfoComment,
  getCheckSaveImage,
  postComment,
} = require("../controllers/detailController");
const { authentication } = require("../controllers/authController");

// tạo API
// API get food
// homeRouter.post("/login", loginUser);

// API create food
detailRouter.get("/get-image-user-by-id/:hinh_id",authentication, getImageAndUserByIdImage);
detailRouter.get("/get-comment-user-by-id/:hinh_id",authentication, getInfoComment);
detailRouter.get("/get-check-save-image/:hinh_id",authentication, getCheckSaveImage);
detailRouter.post("/post-comment",authentication, postComment);

module.exports = detailRouter;
