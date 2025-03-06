const User = require("./Users");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/jwt");

// Register user -------------------------------------------
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobile } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This email already exist" });
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      mobile,
    });

    const new_user = await newUser.save();
    res.status(200).json({
      message: "User registered successfully",
      success: true,
      data: new_user,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error: Registration failed" });
  }
};

// Login User ----------------------------------------------
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const accessToken = await createToken(user);
    return res.status(200).json({ access: accessToken });
  } catch (error) {
    res.status(500).json({ message: "Server error: Login failed!" });
  }
};

// Get user by ID ------------------------------------------
const getUserById = async (req, res) => {
  const userIdFromParams = req.params._id;
  const userIdFromToken = req.userId;
  console.log("Param id-- ",userIdFromParams)
  console.log("Token id-- ",userIdFromToken)
    
  if (userIdFromParams != userIdFromToken) {
    return res
      .status(403)
      .json({ message: "You do not have permission to access this user" });
  }
  try {
      const user = await User.findById(userIdFromParams);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res.status(200).json({
      message: "User Exist!",
      data: user
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error, could not retrieve user" });
  }
};

// Update Logged in user ----------------------------------- 
const updateUser = async (req, res) => {
  const userIdFromParams = req.params._id;
  const userIdFromToken = req.userId;
  console.log("Param id-- ",userIdFromParams)
  console.log("Token id-- ",userIdFromToken)
    
  if (userIdFromParams != userIdFromToken) {
    return res
      .status(403)
      .json({ message: "You do not have permission to update this user" });
  }
  try {
    const { firstName, lastName, password, mobile } = req.body;
    const user = await User.findById(userIdFromParams);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if(user.email){
      return res.status(403).json({message: "Updating email not allowed"})
    }
    // now update user here
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.mobile = mobile || user.mobile;
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();
    updatedUser.password = undefined; 
    return res
      .status(200)
      .json({ message: "User updated successfully", updated_profile: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Server error: update failed!" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const userIdFromParams = req.params._id;
  const userIdFromToken = req.userId;
  if (userIdFromParams != userIdFromToken) {
    return res
      .status(403)
      .json({ message: "You do not have permission to delete this user" });
  }
  try {
    const user = await User.findById(userIdFromParams);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.getByIdAndDelete(userIdFromParams);
    return res.status(200).json({ message: "User Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error: deletion failed" });
  }
};



module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser
};