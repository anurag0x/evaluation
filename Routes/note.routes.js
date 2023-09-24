const express = require("express");
const { NoteModel } = require("../Models/notes.model");
const { auth } = require("../Middlewares/auth.middleware");

const noteRouter = express.Router();
noteRouter.use(auth);

noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "New note is Created" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ username: req.body.username });
    res.status(200).send(notes);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const note = await NoteModel.findOne({ _id: id });
    if (req.body.userID === note.userID) {
      await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).send({ msg: `The note with ID ${id} has been updated` });
    } else {
      res.status(400).send({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.status.send({ error: error });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const note = await NoteModel.findOne({ _id: id });
    if (req.body.userID === note.userID) {
      await NoteModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ msg: `The note with ID ${id} has been deleted` });
    } else {
      res.status(400).send({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.status.send({ error: error });
  }
});

module.exports = {
  noteRouter,
};
