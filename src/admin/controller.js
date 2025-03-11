import { allUsers } from "./services.js";

export const getAllUsers = async(req, res) => {
    console.log("all req", req.roleName)
    
    try {
        if(req.roleName !== "Admin"){
            return res.status(400).json({message: "access denied, incorrect role"})
        }
        const usersData = await allUsers();
        res.status(200).json({status: "Success", message: "fetched all users", data: usersData})
    } catch (error) {
     res.status(500).json({message: "server error, failed to get all users"})   
    }
}