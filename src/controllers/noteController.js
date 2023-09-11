const nodeModel = require("../models/node");

const createNote = async (req, res) => {
    const { title, description } = req.body;

    const newNote = new nodeModel({
        title: title,
        description: description,
        userId: req.userId
    });

    try {
        const result = await newNote.save();
        return res.status(201).json({ message: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }

}

const readNote = async (req, res) => {
    try {
        const result = await nodeModel.find({ userId: req.userId });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

const updateNote = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    const newNote = {
        title: title,
        description: description
    }

    try {
        const result = await nodeModel.findByIdAndUpdate(id, newNote, { new: true });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

const deleteNote = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await nodeModel.findByIdAndDelete(id);
        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = {
    createNote, updateNote, readNote, deleteNote
}