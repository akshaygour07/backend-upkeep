const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  try {
    // Verify the token using your SECRET_KEY (ensure it's in your environment variables)
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("This is decoded -- ", decoded)
 
    // Attach the decoded userId to the request object
    req.userId = decoded.id;
    console.log("middleware userId -- ", req.userId)
    
    // Proceed to the next middleware/controller
    next();

  } catch (error) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;