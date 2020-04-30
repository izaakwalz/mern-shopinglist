const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item model
let Item = require('../../models/Items');

//  @get request to api/items
//  desc Get all items
//  @ access public

router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

//  ? @post request to api/items
//  ? desc create an Item
//  ? @ access  private

router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});

//  @route DELETE to api/items/:id
//  desc delete a item
//  @ access private

router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
