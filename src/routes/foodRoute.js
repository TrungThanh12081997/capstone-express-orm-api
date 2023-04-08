const express = require("express");
const foodRouter = express.Router();

const {
  getFood,
  createFood,
  removeFood,
  updateFood,
} = require("../controllers/foodController");

// tạo API
// API get food
foodRouter.get("/get-food", getFood);

// API create food
foodRouter.post("/create-food", createFood);

// API update food
foodRouter.put("/update-food/:food_id", updateFood);

// API create food
foodRouter.delete("/remove-food/:food_id", removeFood);

module.exports = foodRouter;
