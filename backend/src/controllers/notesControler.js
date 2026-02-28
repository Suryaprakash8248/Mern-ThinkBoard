import Note from "../models/Note.js";

export async function getNotes(req,res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getallNotes controllers",error);
    res.status(500).json({message:"internal server error"})
    
  }
};

export async function getNoteById(req,res) {
  try {
    const getNoteId = req.params.id
    const getNote = await Note.findById(getNoteId);
    if(!getNote) return res.json({message:"Note not found!"});
    res.status(200).json(getNote);
  } catch (error) {
    console.error("error in finding note",error);
    res.status(500).json({message:"internal server problem"});
    console.log(getNoteId);
    
  }
}

export async function postNote(req,res) {
  try {
    const {title, content} = req.body;
    const note = new Note({title, content});
    const savedNote = await note.save();
    res.status(201).json(savedNote);
    
    
  } catch (error) {
    console.error("error in getallNotes controllers",error);
    res.status(500).json({message:"internal server error suyra"})
    
  }
};

export async function updateNote(req,res) {
  try {
    const {title, content} = req.body;
    const getNote = req.params.id;
    const updatedNote=await Note.findByIdAndUpdate(getNote,{title, content},{new:true});
    if(!updatedNote) return res.json({message:"not found"})
    res.json({messgae:"updated successfully!"});
  } catch (error) {
    console.error("error in update note",error);
    res.status(500).json({message:"internal server error"})
  }
};

export async function deleteNote(req,res) {
 try {
    const getNote = req.params.id;
    const deletedNote=await Note.findByIdAndDelete(getNote);
    if(!deletedNote) return res.json({message:"not found"})
    res.json({messgae:"deleted successfully!"});
  } catch (error) {
    console.error("error in deletion",error);
    res.status(500).json({message:"internal server error"})

  }
};