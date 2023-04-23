const { Op } = require("sequelize");
const initModels = require("../models/init-models");
const sequelize = require("../models");
const model = initModels(sequelize);

const { successCode, errorCode, failCode } = require("../config/response");
const { descripToken } = require("../config/jwt");
const getFood = async (req, res) => {
  try {
    // const { token} = req.headers;
    // const decodeToken=descripToken(token);

    // const {user_id} = decodeToken
    // SELECT * FROM food WHERE food_name LIKE '%a%'
    // bất đồng bộ
    // list object [{},{}]
    let data = await model.food.findAll({
      // where: {
      //     food_name: {
      //         [Op.like]: '%a%'
      //     }
      // }
      // lấy data từ bảng khác qua thông qua as
      include: ["user_id_user_orders"],
    });

    successCode(res,  "Get food success" ,data );
  } catch (err) {
    failCode(res, `BE Error ${err}`,);
  }
};

const createFood = async (req, res) => {
  try {
    const { food_name, image, price, desc, type_id } = req.body;

    // INSERT INTO VALUES
    let newModel = {
      food_name,
      image,
      price,
      desc,
      type_id,
    };

    await model.food.create(newModel);
    successCode(res,  "Create food success" ,newModel);
  } catch (err) {
    failCode(res, "BE Error");
  }
};

const updateFood = async (req, res) => {
  try {
    let { food_id } = req.params;

    let { food_name, image, price, desc, type_id } = req.body;

    let modelUpdate = {
      food_name,
      image,
      price,
      desc,
      type_id,
    };
    await model.food.update(modelUpdate, { where: { food_id } });

    successCode(res,  "Create food success" , modelUpdate);
  } catch (err) {
    failCode(res, "BE Error");
  }
};

const removeFood = async (req, res) => {
  // DELETE FROM WHERE
  // Food.destroy({ where: { food_id } });
  try {
    let { food_id } = req.params;
    await model.food.destroy({
      where: {
        food_id,
      },
    });
    successCode(res, "Create food success");
  } catch (err) {
    failCode(res, "BE Error");
  }
};

module.exports = { getFood, createFood, updateFood, removeFood };
