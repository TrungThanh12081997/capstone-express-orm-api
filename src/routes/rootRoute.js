const express = require("express");
const rootRouter = express.Router();


const homeRouter = require("./homeRoute");
const detailRouter = require("./detailRoute");
const imageRouter = require("./imageRoute");
const postImageRouter = require("./postImageRoute");
const userRouter = require("./userRoute");

const { loginUser, signUpUser } = require("../controllers/authenController");

rootRouter.use("/signup", signUpUser);
rootRouter.use("/login", loginUser);

rootRouter.use("/home", homeRouter);
rootRouter.use("/detail", detailRouter);
rootRouter.use("/image", imageRouter);
rootRouter.use("/post-image", postImageRouter);
rootRouter.use("/user", userRouter);


module.exports = rootRouter;
