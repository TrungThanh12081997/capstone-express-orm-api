const { checkToken } = require("../config/jwt");

const authentication = (req, res, next) => {
  try {
    const { token } = req.headers;
    checkToken(token);
    // res.status(200).send(check);
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = { authentication };
