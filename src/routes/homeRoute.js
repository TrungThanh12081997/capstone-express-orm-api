const express = require("express");
const homeRouter = express.Router();

const { getImage, getImageByName } = require("../controllers/homeController");
const { authentication } = require("../controllers/authController");

// tạo API
// API get food
// homeRouter.post("/login", loginUser);

// API create food
homeRouter.get("/get-image",authentication, getImage);
homeRouter.get("/get-image-by-name",authentication, getImageByName);

module.exports = homeRouter;
