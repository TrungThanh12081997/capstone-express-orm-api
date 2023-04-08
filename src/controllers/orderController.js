const initModels = require("../models/init-models");
const sequelize = require("../models");
const { successCode, failCode } = require("../config/response");
const model = initModels(sequelize);

const createOrder = async (req, res) => {
  try {
    const { user_id, food_id, amount, code } = req.body;
    const data = await model.order.findAll({
      where: {
        user_id,
        food_id,
      },
    });
    if (data) {
      failCode(res, "Duplicate");
    } else {
      await model.order.create(req.body);
      successCode(res, "Create order success");
    }
    // successCode(res, "Like restaurent success");
  } catch (err) {
    failCode(res, "Lỗi BE");
  }
};

module.exports = { createOrder };
