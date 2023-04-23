const initModels = require("../models/init-models");
const sequelize = require("../models");
const model = initModels(sequelize);
const { successCode, failCode } = require("../config/response");
const bcrypt = require("bcrypt");

const changeUserInfo = async (req, res) => {
  try {
    const { nguoi_dung_id } = req.params;
    const { ho_ten, email, mat_khau, tuoi, anh_dai_dien } = req.body;
    const hashPass = await bcrypt.hash(mat_khau, 10);
    await model.nguoi_dung.update(
      {
        ho_ten,
        tuoi,
        email,
        anh_dai_dien,
        mat_khau: hashPass,
      },
      {
        where: {
          nguoi_dung_id,
        },
      }
    );
    successCode(res, "Đổi thông tin user ok", {
      ho_ten,
      tuoi,
      email,
    });
  } catch (err) {
    failCode(res, `lỗi BE ${err}`);
  }
};

module.exports = {
  changeUserInfo,
};
