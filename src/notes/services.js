import NoteModel from "./noteModel.js";

export const addNote = async(noteData) => {
    const newNote =  new NoteModel(noteData)
    return newNote.save();
}

export const uniqueSubjectCount = async(userId)  => {
    const result = await NoteModel.distinct("subject", { userId }).countDocuments();
    return result;
}

export const noteByUserId = async(userId) => {
    const result = await NoteModel.find({userId})
    return result;
}

export const noteWithUserDetails = async(id) => {
    const result = await NoteModel.findById(id).populate("userId", "email");
    return result;
}

export const noteById = async(noteId) => {
    const result = await NoteModel.findById(noteId);
    return result;
}