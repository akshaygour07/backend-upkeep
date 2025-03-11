import bcrypt from "bcryptjs";
import { createToken } from "../middlewares/tokenGenerator.js";
import { checkExistingUser, createUser, userById, deleteUserById } from "./services.js";

// Register user -------------------------------------------
export const registerUser = async(req, res) => {
  try {
    const { firstName, lastName, email, password, mobile, role } = req.body;
    const isUserExist = await checkExistingUser(email);
    if (isUserExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const bodyDTO = { firstName, lastName, email, password, mobile, role };
    await createUser(bodyDTO);
    res.status(201).json({ status:"success", message: "user registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "server error, registration failed", error: err });
  }
};

// Login User ----------------------------------------------
export const loginUser = async(req, res) => {
  try {
    const { email, password, role } = req.body;

    const userSearch = await checkExistingUser(email);
    if (!userSearch) {
      return res.status(400).json({ message: "email not registered" });
    }
    
    const userRole = role || "User";
    if(userSearch.role !== userRole){
      return res.status(401).json({message: "access denied"})
    }

    const passwordMatch = await bcrypt.compare(password, userSearch.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "password invalid" });
    }

    const accessToken = await createToken(userSearch._id, userSearch.role);
    return res.status(200).json({ access: accessToken });
  } catch (err) {
    res.status(500).json({ message: "server error, login failed", error: err });
  }
};

// Get user by ID ------------------------------------------
export const getUserById = async (req, res) => {
  try {
    const userSearch = await userById(req.userId);
    if (!userSearch) {
      return res.status(400).json({ message: "user not found!" });
    }
    res.status(200).json({ status: "success", message: "user fetched successfully", data: userSearch});

  } catch (err) {
     res.status(500).json({ message: "Server error, failed to fetch user", error: err });
  }
};

// Update Logged in user -----------------------------------
export const updateUser = async (req, res) => {
  try {    
    const userData = await userById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found!" });
    }

    const { firstName, lastName, password, mobile } = req.body;
    if (req.body.email) {
      return res.status(403).json({ message: "Updating email not allowed" });
    }
    // now update user here
    userData.firstName = firstName || userData.firstName;
    userData.lastName = lastName || userData.lastName;
    userData.mobile = mobile || userData.mobile;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(password, salt);
    }

    await userData.save();
    res.status(200).json({ status:"success", message: "user updated successfully", data: userData});
  } catch (error) {
    return res.status(500).json({ message: "server error, failed to update user" });
  }
};

// Delete user ---------------------------------------------
export const deleteUser = async (req, res) => {
  try {
    const userData = await userById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found!" });
    }

    await deleteUserById(userData._id)
    res.status(200).json({ status:"success", message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to delete user" });
  }
};