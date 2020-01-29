const express = require('express');
const router = express.Router();

// @route GET api/contacts
// @desc GET all users contacts
// @acces Private
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

// @route POST api/contacts
// @desc ADD new contact
// @acces Private
router.post('/', (req, res) => {
  res.send('Add contact');
});

// @route PUT api/contacts/:id
// @desc Update contact
// @acces Private
router.put('/:id', (req, res) => {
  res.send('Update conatct');
});

// @route DELETE api/contacts/:id
// @desc Delete contact
// @acces Private
router.delete('/:id', (req, res) => {
  res.send('Delete conatct');
});

module.exports = router;
