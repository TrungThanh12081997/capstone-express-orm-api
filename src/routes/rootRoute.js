const express = require('express');
const rootRouter = express.Router();

const userRouter = require('./userRoute');
const foodRouter = require('./foodRoute');
const likeRouter = require('./likeRoute');
const rateRouter = require('./rateRoute');
const orderRouter = require('./orderRoute');


rootRouter.use("/user", userRouter);

rootRouter.use("/food", foodRouter);

rootRouter.use("/like", likeRouter);


rootRouter.use("/rate", rateRouter);

rootRouter.use("/order", orderRouter);

// rootRouter.use("/product", productRouter);

module.exports = rootRouter;