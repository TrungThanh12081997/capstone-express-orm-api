const initModels = require("../models/init-models");
const sequelize = require("../models");
const { Op } = require("sequelize");

const { failCode, successCode, errorCode } = require("../config/response");
const model = initModels(sequelize);

const getUser = async (req, res) => {
  try {
    const users = await model.hinh_anh.findAll({
      include: "nguoi_dung",
    });
    if (users.length > 0) {
      successCode(res, "lấy thông tin user ok ", users);
    } else {
      errorCode(res, "không có data");
    }
  } catch (err) {
    failCode(res, `lỗi BE ${err}`, 500);
  }
};

const getImageByUserId = async (req, res) => {
  try {
    const { nguoi_dung_id } = req.params;
    const images = await model.hinh_anh.findAll({
      include: "nguoi_dung",
      where: {
        nguoi_dung_id,
      },
    });
    if (images.length > 0) {
      successCode(res, "lấy thông tin hình ok ", images);
    } else {
      errorCode(res, "hình chưa được user nào lưu");
    }
  } catch (err) {
    failCode(res, `lỗi BE ${err}`, 500);
  }
};

const getImageCreatedByUserId = async (req, res) => {
  try {
    const { nguoi_dung_id } = req.params;
    const images = await model.luu_anh.findAll({
      include: ["nguoi_dung", "hinh"],
      where: {
        nguoi_dung_id,
      },
    });
    if (images.length > 0) {
      successCode(res, "lấy thông tin hình ok ", images);
    } else {
      errorCode(res, "user chưa tạo hình nào");
    }
  } catch (err) {
    failCode(res, `lỗi BE ${err}`, 500);
  }
};

const deleteImageById = async (req, res) => {
  try {
    const { hinh_id } = req.params;
    await model.luu_anh.destroy({
      where: {
        hinh_id,
      },
    });
    await model.binh_luans.destroy({
      where: {
        hinh_id,
      },
    });
    await model.hinh_anh.destroy({
      where: {
        hinh_id,
      },
    });
    successCode(res, "Xóa thông tin hình ok ");
  } catch (err) {
    failCode(res, `lỗi BE ${err}`, 500);
  }
};
module.exports = {
  getUser,
  getImageByUserId,
  deleteImageById,
  getImageCreatedByUserId,
};
