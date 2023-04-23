const express = require("express");
const { changeUserInfo } = require("../controllers/userController");
const { authentication } = require("../controllers/authController");
const userRouter = express.Router();

userRouter.put("/change-info-user/:nguoi_dung_id",authentication, changeUserInfo);

module.exports = userRouter;
