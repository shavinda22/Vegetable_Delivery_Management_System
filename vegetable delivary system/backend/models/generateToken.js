const jwt = require("jsonwebtoken");

const secretKey =
  "Find the best prices of fresh vegetable in Sri Lanka for online delivery. Islandwide deliveryat best price and quality";

const generateToken = (userId) => {
  const payload = { userId };
  const options = { expiresIn: "1h" };

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

module.exports = generateToken;
