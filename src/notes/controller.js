import { createNoteDB } from "./services.js";

export const createNote = async(req, res) => {
    try {
        const userId = req.userId
        const { subject, title, content } = req.body;
        const bodyDTO = { userId, subject, title, content }
        console.log("bofu------>", bodyDTO)
        const noteData = await createNoteDB(bodyDTO)
        res.status(200).json({message: "note created successfully", data: noteData})
    } catch (error) {
        console.log("err------->", error)
        res.status(500).json({message: "server error, failed to create notes"})
    }
}