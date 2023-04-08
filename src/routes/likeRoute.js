const express = require("express");
const likeRouter = express.Router();

const {
  createLikeUser,
  getLikeWithUser,
  getLikeWithRes,
  deleteLikeUser
} = require("../controllers/likeController");

// tạo API
likeRouter.post("/post-like", createLikeUser);
likeRouter.delete("/unlike", deleteLikeUser);

likeRouter.get("/get-like-by-user", getLikeWithUser);
likeRouter.get("/get-like-by-res", getLikeWithRes);

module.exports = likeRouter;
