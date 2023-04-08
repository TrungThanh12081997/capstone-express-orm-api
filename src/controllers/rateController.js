const initModels = require("../models/init-models");
const sequelize = require("../models");
const { successCode, failCode } = require("../config/response");
const model = initModels(sequelize);

const createRateUser = async (req, res) => {
  try {

    const { res_id,user_id } = req.body;
    const data = await model.rate_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });
    if (data) {
      failCode(res, "Duplicate");
    } else {
      await model.rate_res.create(req.body);
      successCode(res, "Rate success");
    }
  } catch (err) {
    failCode(res,` Lỗi BE ${err}`);
  }
};

const getRateWithUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await model.user.findAll({
      where: {
        user_id,
      },
      include: ["res_id_restaurant_rate_res"],
    });
    successCode(res, "Get rate by user success", data);
  } catch (err) {
    failCode(res, "Lỗi BE");
  }
};

const getRateWithRes = async (req, res) => {
  try {
    const { res_id } = req.params;
    const data = await model.restaurant.findAll({
      where: {
        res_id,
      },
      include: ["user_id_user_rate_res"],
    });
    successCode(res, "Get rate by restaurent success", data);
  } catch (err) {
    failCode(res, "Lỗi BE");
  }
};
module.exports = { createRateUser, getRateWithUser, getRateWithRes };
