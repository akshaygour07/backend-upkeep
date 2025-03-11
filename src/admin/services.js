import User from "../users/userModel.js";

// Get all users -------------------------------------------
export const allUsers = async() => {
 return await User.find();
}