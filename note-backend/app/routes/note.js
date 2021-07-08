const express = require('express');
const { addNote, getNotes, getNoteById, updateNote, deleteNote } = require('../controllers/notes');
const { getCurrentUser } = require('../middleware/auth');
const router = express.Router();

router.post('/update-note/:userId/:noteId', [getCurrentUser], updateNote);
router.get('/delete-note/:userId/:noteId', [getCurrentUser], deleteNote);
router.get('/get-note/:userId/:noteId', [getCurrentUser], getNoteById);
router.get('/get-notes/:userId', [getCurrentUser], getNotes);
router.post('/add-note/:userId', [getCurrentUser], addNote);


module.exports = router;