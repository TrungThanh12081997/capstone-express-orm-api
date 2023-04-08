const express = require("express");
const likeRouter = express.Router();

const {
  createRateUser,
  getRateWithUser,
  getRateWithRes,
} = require("../controllers/rateController");

// tạo API
likeRouter.post("/post-rate", createRateUser);
likeRouter.get("/get-rate-by-user/:user_id", getRateWithUser);
likeRouter.get("/get-rate-by-res/:res_id", getRateWithRes);

module.exports = likeRouter;
