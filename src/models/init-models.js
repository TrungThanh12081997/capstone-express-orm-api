const DataTypes = require("sequelize").DataTypes;
const _SequelizeMeta = require("./SequelizeMeta");
const _binh_luans = require("./binh_luans");
const _hinh_anh = require("./hinh_anh");
const _luu_anh = require("./luu_anh");
const _nguoi_dung = require("./nguoi_dung");

function initModels(sequelize) {
  const SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  const binh_luans = _binh_luans(sequelize, DataTypes);
  const hinh_anh = _hinh_anh(sequelize, DataTypes);
  const luu_anh = _luu_anh(sequelize, DataTypes);
  const nguoi_dung = _nguoi_dung(sequelize, DataTypes);

  hinh_anh.belongsToMany(nguoi_dung, { as: 'nguoi_dung_id_nguoi_dungs', through: binh_luans, foreignKey: "hinh_id", otherKey: "nguoi_dung_id" });
  nguoi_dung.belongsToMany(hinh_anh, { as: 'hinh_id_hinh_anhs', through: binh_luans, foreignKey: "nguoi_dung_id", otherKey: "hinh_id" });
  binh_luans.belongsTo(hinh_anh, { as: "hinh", foreignKey: "hinh_id"});
  hinh_anh.hasMany(binh_luans, { as: "binh_luans", foreignKey: "hinh_id"});
  luu_anh.belongsTo(hinh_anh, { as: "hinh", foreignKey: "hinh_id"});
  hinh_anh.hasMany(luu_anh, { as: "luu_anhs", foreignKey: "hinh_id"});
  binh_luans.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(binh_luans, { as: "binh_luans", foreignKey: "nguoi_dung_id"});
  hinh_anh.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(hinh_anh, { as: "hinh_anhs", foreignKey: "nguoi_dung_id"});
  luu_anh.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(luu_anh, { as: "luu_anhs", foreignKey: "nguoi_dung_id"});

  return {
    SequelizeMeta,
    binh_luans,
    hinh_anh,
    luu_anh,
    nguoi_dung,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
