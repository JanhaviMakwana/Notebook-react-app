const express = require('express');
const { addNote, getNotes, getNoteById, updateNote, deleteNote } = require('../controllers/notes');
const { getCurrentUser, authenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/update-note/:userId/:noteId', [authenticate,getCurrentUser], updateNote);
router.get('/delete-note/:userId/:noteId', [authenticate,getCurrentUser], deleteNote);
router.get('/get-note/:userId/:noteId', [authenticate,getCurrentUser], getNoteById);
router.get('/get-notes/:userId', [authenticate,getCurrentUser], getNotes);
router.post('/add-note/:userId', [authenticate,getCurrentUser], addNote);


module.exports = router;