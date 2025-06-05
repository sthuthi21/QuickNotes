const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleware");

//create note
router.post("/", authMiddleware, async (req,res) => {
    const {title,content} = req.body;
    try{
        const newNote = new Note({
            title , 
            content , 
            user: req.userId
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err){
        res.status(500).json({message: "Error creating note"});
    }
});

//get the users notes
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

//update a note
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.title = title;
    note.content = content;
    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: "Error updating note" });
  }
});

//delete a note
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note" });
  }
});

module.exports = router;


