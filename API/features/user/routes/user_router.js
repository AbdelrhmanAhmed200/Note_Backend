const express = require('express');
const router = express.Router();
const register = require('../controller/sign_up')
const login = require('../controller/login')
const auth = require('../Middleware/auth')
const addNote = require('../controller/add_note')
const getNotes = require('../controller/get_notes')
const updateNote = require('../controller/Update_note')


router.post('/auth/register',register.register)
router.post('/auth/login',login.login)
router.post('/addnote',auth,addNote.addNote)


router.get('/getnotes', auth,getNotes.getNote)

router.put('/update/:id',auth,updateNote.updateNote)

module.exports = router