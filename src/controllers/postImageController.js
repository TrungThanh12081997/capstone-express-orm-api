const initModels = require("../models/init-models");
const sequelize = require("../models");
const multer = require("multer");
const fs = require("fs");

const { failCode, successCode, errorCode } = require("../config/response");
const model = initModels(sequelize);

const postImageByUser = async (req, res) => {
  try {
    let file = req.file;
    fs.readFile(
      process.cwd() + "/public/img/" + file.filename,
      async (err, data) => {
        // => băm base64 => load hoặc lưu dự liệu
        let fileBase = await `data:${file.mimetype};base64,${Buffer.from(
          data
        ).toString("base64")}`;

        // => xóa hình
        //xóa file
        fs.unlink(process.cwd() + "/public/img/" + file.filename, (err) => {});
        await model.hinh_anh.create({
          ten_hinh: req.body.ten_hinh,
          duong_dan: fileBase,
          mo_ta: req.body.mo_ta,
          nguoi_dung_id: req.body.nguoi_dung_id,
        });

        const images = await model.hinh_anh.findAll({
          where: {
            duong_dan: fileBase,
          },
        });
        if (images.length > 0) {
          await model.luu_anh.create({
            hinh_id: images[images.length - 1].hinh_id,
            nguoi_dung_id: req.body.nguoi_dung_id,
          });
        }
        successCode(res, "Upload file thành công", images);
      }
    );
  } catch (err) {
    failCode(res, `lỗi BE ${err}`, 500);
  }
};

module.exports = {
  postImageByUser,
};
