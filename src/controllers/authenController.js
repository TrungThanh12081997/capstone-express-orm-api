const initModels = require("../models/init-models");
const sequelize = require("../models");
const bcrypt = require("bcrypt");

const { failCode, successCode, errorCode } = require("../config/response");
const { generateToken } = require("../config/jwt");
const model = initModels(sequelize);

const signUpUser = async (req, res) => {
  try {
    const { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
    const hashPassword = await bcrypt.hash(mat_khau, 10);

    const newData = {
      email,
      mat_khau: hashPassword,
      ho_ten,
      tuoi,
      anh_dai_dien,
    };
    const checkEmail = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });
    if (checkEmail) {
      failCode(res, "Email đã đăng ký,chọn # đi");
    } else {
      await model.nguoi_dung.create(newData);
      successCode(res, "đăng ký ok");
    }
  } catch (err) {
    failCode(res, "lỗi BE", 500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, mat_khau } = req.body;
    const checkEmail = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });
    if (checkEmail) {
      const checkPass = await bcrypt.compare(mat_khau, checkEmail.mat_khau);
      const token = generateToken(checkEmail);
      if (checkPass) {
        successCode(res, "Ok đăng nhập", token);
      } else {
        errorCode(res, "Sai password");
      }
    } else {
      errorCode(res, "Email không tồn tại");
    }
  } catch (err) {
    failCode(res, `lỗi BE ${err}`);
  }
};

module.exports = { signUpUser, loginUser };
