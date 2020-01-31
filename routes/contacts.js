const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route GET api/contacts
// @desc GET all users contacts
// @acces Private
router.get('/', auth, async (req, res) => {
  // res.send('Get all contacts');
  try {
    const contacts = await Contact.find({user: req.user.id}).sort({date: -1});

    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route POST api/contacts
// @desc ADD new contact
// @acces Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // res.send('Add contact');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name, email, phone, type} = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route PUT api/contacts/:id
// @desc Update contact
// @acces Private
router.put('/:id', auth, async (req, res) => {
  // res.send('Update conatct');
  const {name, email, phone, type} = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({message: 'Contact not found'});

    //Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({message: 'Not authorized'});
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {$set: contactFields},
      {new: true}
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/contacts/:id
// @desc Delete contact
// @acces Private
router.delete('/:id', auth, async (req, res) => {
  // res.send('Delete conatct');

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({message: 'Contact not found'});

    //Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({message: 'Not authorized'});
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({message: 'Contact Removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;