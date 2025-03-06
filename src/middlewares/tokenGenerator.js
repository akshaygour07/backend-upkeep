const jwt = require("jsonwebtoken");

// function to create token
const createToken = (user) => {
  const payload = { id: user._id, email: user.email };
  const options = { expiresIn: "24h" };

  return jwt.sign(payload, process.env.SECRET_KEY, options);
};

module.exports = createToken;