// đối tượng dùng để kết nối CSDL

const { Sequelize } = require("sequelize");
const config = require("../config/config");

// const sequelize = new Sequelize('db_food', 'root', '1234', {
//     host: "localhost",
//     dialect: "mysql",
//     port: "3307"
// })
const sequelize = new Sequelize(config.database, 'root', config.pass, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
});

module.exports = sequelize;

// try {
//     sequelize.authenticate();
//     console.log("thành công")
// } catch (err) {
//     console.log("thất bại", err)

// }
// node src/models/index.js
