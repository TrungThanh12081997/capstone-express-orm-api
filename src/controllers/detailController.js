const initModels = require("../models/init-models");
const sequelize = require("../models");
const { Op } = require("sequelize");

const { failCode, successCode, errorCode } = require("../config/response");
const model = initModels(sequelize);

const getImageAndUserByIdImage = async (req, res) => {
  try {
    const { hinh_id } = req.params;
    const info = await model.luu_anh.findAll({
      where: {
        hinh_id: hinh_id,
      },
      include: ["nguoi_dung", "hinh"],
    });

    if (info.length > 0) {
      successCode(res, "lấy thông tin ok ", info);
    } else {
      errorCode(res, "không có data");
    }
  } catch (err) {
    failCode(res, `lỗi BE${err}`, 500);
  }
};

const getInfoComment = async (req, res) => {
  try {
    const { hinh_id } = req.params;
    const info = await model.binh_luans.findAll({
      where: {
        hinh_id,
      },
      include: ["nguoi_dung", "hinh"],
    });
    if (info.length > 0) {
      successCode(res, "lấy COMMENT ok ", info);
    } else {
      errorCode(res, "không có data");
    }
  } catch (err) {
    failCode(res, `lỗi BE${err}`, 500);
  }
};

const getCheckSaveImage = async (req, res) => {
  try {
    const { hinh_id } = req.params;
    const getCheckImage = await model.luu_anh.findOne({
      where: {
        hinh_id,
      },
      include: ["hinh", "nguoi_dung"],
    });
    if (getCheckImage) {
      successCode(res, "hình đã save ", getCheckImage);
    } else {
      errorCode(res, "hình chưa lưu");
    }
  } catch (err) {
    failCode(res, `lỗi BE${err}`, 500);
  }
};

const postComment = async (req, res) => {
  try {
    const { nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung } = req.body;
    await model.binh_luans.create({
      nguoi_dung_id,
      hinh_id,
      ngay_binh_luan,
      noi_dung,
    });
    successCode(res, "Bình luận ok");
  } catch (err) {
    failCode(res, `lỗi BE${err}`, 500);
  }
};
module.exports = {
  getImageAndUserByIdImage,
  getInfoComment,
  getCheckSaveImage,
  postComment,
};
