import NoteModel from "./noteModel.js";

export const createNoteDB = async(noteData) => {
    const newNote =  new NoteModel(noteData)
    return newNote.save();
}

export const findById = async(subject) => {
    const result = await NoteModel.findOne({subject})
    return result;
}