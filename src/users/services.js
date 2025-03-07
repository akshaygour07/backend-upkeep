import userModel from "./userModel.js";

export const checkExistingUser = async(email) => {
    return await userModel.findOne({email})
}

export const createUser = async(userData) => {
    const newUser = new userModel(userData)
    return newUser.save()
}

export const userById = async(userId) => {
    return await userModel.findById(userId)
}

export const deleteUserById = async(userId) => {
    return await userModel.findByIdAndDelete(userId)
}