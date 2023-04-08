const initModels = require("../models/init-models");
const sequelize = require("../models");
const { successCode, failCode } = require("../config/response");
const model = initModels(sequelize);

const createLikeUser = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;
    const data = await model.like_res.findAll({
      where: {
        user_id,
        res_id,
      },
    });
    if (data.length > 0) {
      failCode(res, "Duplicate", data);
    } else {
      await model.like_res.create(req.body);
      successCode(res, "Create like success");
    }
    successCode(res, "Like restaurent success", data);
  } catch (err) {
    failCode(res, `Lỗi BE ${err}`);
  }
};

const deleteLikeUser = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;

    await model.like_res.destroy({
      where: {
        user_id,
        res_id,
      },
    });
    successCode(res, "Unlike success");
  } catch (err) {
    failCode(res, `Lỗi BE ${err}`);
  }
};
const getLikeWithUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await model.user.findAll({
      where: {
        user_id,
      },
      include: ["res_id_restaurants"],
    });
    successCode(res, "Get like by user success", data);
  } catch (err) {
    failCode(res, "Lỗi BE");
  }
};

const getLikeWithRes = async (req, res) => {
  try {
    const { res_id } = req.params;
    const data = await model.restaurant.findAll({
      where: {
        res_id,
      },
      include: ["user_id_users"],
    });
    successCode(res, "Get like by restaurent success", data);
  } catch (err) {
    failCode(res, "Lỗi BE");
  }
};
module.exports = {
  createLikeUser,
  getLikeWithUser,
  deleteLikeUser,
  getLikeWithRes,
};
