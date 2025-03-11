import { addNote, noteByUserId, uniqueSubjectCount, noteById } from "./services.js";

export const createNote = async(req, res) => {
    try {
        const userId = req.userId
        const { subject, title, content } = req.body;
        const bodyDTO = { userId, subject, title, content } 
        const subjectCount = uniqueSubjectCount(userId)  

        if(subjectCount > 5){
            return res.status(400).json({ message: "you can only create a maximum of 5 unique subjects." })
        }

        const noteData = await addNote(bodyDTO)
        // const noteWithUser = await noteWithUserDetails(noteData._id) 
        res.status(201).json({message: "note created successfully", data: noteWithUser})
    } catch (error) {
        // console.log("err------->", error)
        res.status(500).json({message: "server error, failed to create notes"})
    }
}

export const getNoteByUserId = async(req, res) => {
    try {
        const userId = req.userId;
        // console.log("logged in user---", userId)
        const result = await noteByUserId(userId)
        // console.log("getNoteByUserId", result)
        res.status(200).json({message: "note fetched for particular user", data: result})
    } catch (error) {
        res.status(500).json({message: "server error, failed to fetch notes"})
    }
}


export const updateNotes = async(req, res) => {
    try {
       const { noteId } = req.params
       const { subject, title, content } = req.body;

       const noteData = await noteById(noteId)
       console.log("noteData", noteData)
       if(!noteData){
        return res.status(400).json({message: "note does not exist"})
       }

       noteData.subject = subject || noteData.subject;
       noteData.title = title || noteData.title;
       noteData.content = content || noteData.content;

       await noteData.save()
       res.status(200).json({message: "note updated successfully", data: result})
    } catch (error) {
       res.status(500).json({message: "server error, failed to update notes"})
    }
}