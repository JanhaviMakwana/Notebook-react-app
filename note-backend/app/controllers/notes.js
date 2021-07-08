const db = require('../models');
const Note = db.note;
const Tag = db.tag;

exports.addNote = async (req, res) => {
    const { note, tags } = req.body;
    try {
        const createdNote = await req.user.createNote({ description: note });
        if (createdNote) {
            tags.map(tag => {
                return Tag.create({ noteId: createdNote.id, desc: tag });
            });
            const notes = await req.user.getNotes();

            return res.send(notes);
        }
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getNotes = async (req, res) => {
    const { keyword } = req.query;
    let fetchedNotes;
    try {
        if (keyword) {
            fetchedNotes = await req.user.getNotes({ include: { model: db.tag, where: { desc: keyword } } });
        } else {
            fetchedNotes = await req.user.getNotes({ include: ['tags'] });
        }
        res.send(fetchedNotes);
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getNoteById = async (req, res) => {
    const { noteId } = req.params;
    try {
        const note = await req.user.getNotes({ where: { id: noteId }, include: { model: db.tag } });
        res.send(note[0]);
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.updateNote = async (req, res) => {
    const { noteId } = req.params;
    const { note, tags } = req.body;
    try {
        const updatedNote = await Note.update({ description: note }, { where: { id: noteId } });
        const temp = await (await Note.findByPk(noteId)).getTags();

        if (temp) {
            temp.map(fetchedTag => {
                fetchedTag.destroy();
            });
            tags.map(tag => {
                return Tag.create({ noteId: noteId, desc: tag });
            });
            const updatedNotes = await req.user.getNotes({ include: ['tags'] });
            return res.send(updatedNotes);
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.deleteNote = async (req, res) => {
    const { noteId } = req.params;
    try {
        const fetchedNote = await Note.findByPk(noteId);
        if (fetchedNote) {
            const temp = await fetchedNote.getTags();
            if (temp) {
                temp.map(fetchedTag => {
                    fetchedTag.destroy();
                });
                const del = await fetchedNote.destroy();
                if (del) {
                    const updatedNotes = await req.user.getNotes();
                    return res.send(updatedNotes);
                }

                /*  res.send({ message: "deleted successfully..." }) */
            } else {
                fetchedNote.destroy();
                const updatedNotes = await req.user.getNotes();
                return res.send(updatedNotes);
            }

        }
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};