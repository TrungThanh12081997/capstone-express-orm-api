const express = require("express");
const imageRouter = express.Router();

const {
  getUser,
  getImageByUserId,
  getImageCreatedByUserId,
  deleteImageById,
} = require("../controllers/imageController");
const { authentication } = require("../controllers/authController");

// tạo API
// API get food
// homeRouter.post("/login", loginUser);

// API create food
imageRouter.get("/get-user", authentication, getUser);
imageRouter.get(
  "/get-image-by-user-id/:nguoi_dung_id",
  authentication,
  getImageByUserId
);
imageRouter.get(
  "/get-image-created-by-user-id/:nguoi_dung_id",
  authentication,
  getImageCreatedByUserId
);
imageRouter.delete(
  "/delete-image-by-id/:hinh_id",
  authentication,
  deleteImageById
);

module.exports = imageRouter;
