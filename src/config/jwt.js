const jwt = require("jsonwebtoken");
// generate token  : tạo
const generateToken = (data) => {
  // t1 là tên token
  // tham số t2 là khóa bí mật
  //
  const token = jwt.sign({ data }, "private-key", {
    expiresIn: "5m",
    // algorithm: "HS256",
  });
  return token;
};
// verify token : kiểm tra
const checkToken = (token) => {
    // private key trùng private key lúc tạo
    const verifyToken = jwt.verify(token,'private-key')
    return verifyToken
};
// decode token : giải mã token
const descripToken = (token) => {
    return  jwt.decode(token)
};

module.exports = { generateToken, checkToken, descripToken };
