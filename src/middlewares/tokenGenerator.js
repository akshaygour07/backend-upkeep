import jwt from "jsonwebtoken";

// function to create token
export const createToken = async(userId, roleName) => {
  const payload = { id: userId, role: roleName };
  const options = { expiresIn: "24h" };

  return jwt.sign(payload, process.env.SECRET_KEY, options);
};

