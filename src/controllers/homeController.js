const initModels = require("../models/init-models");
const sequelize = require("../models");
const { Op } = require("sequelize");

const { failCode, successCode, errorCode } = require("../config/response");
const model = initModels(sequelize);

const getImage = async (req, res) => {
  try {
    const images = await model.hinh_anh.findAll();
    if (images.length > 0) {
      successCode(res, "lấy hình ok ", images);
    } else {
      errorCode(res, "không có data");
    }
  } catch (err) {
    failCode(res, "lỗi BE", 500);
  }
};

const getImageByName = async (req, res) => {
  try {
    const images = await model.hinh_anh.findOne({
      where: {
        ten_hinh: req.body.ten_hinh,
      },
    });
    if (images) {
      successCode(res, "lấy hình ok ", images);
    } else {
      errorCode(res, "không có data");
    }
  } catch (err) {
    failCode(res, `lỗi BE${err}`, 500);
  }
};

module.exports = { getImage, getImageByName };
