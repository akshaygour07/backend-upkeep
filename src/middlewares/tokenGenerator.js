import jwt from "jsonwebtoken";

// function to create token
export const createToken = async(userId) => {
  const payload = { id: userId };
  const options = { expiresIn: "24h" };

  return jwt.sign(payload, process.env.SECRET_KEY, options);
};

