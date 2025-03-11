import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model('Note', notesSchema);

export default Note;