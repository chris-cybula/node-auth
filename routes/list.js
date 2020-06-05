const express = require("express");
const router = express.Router();

//import schema
const Item = require("../models/Item");

//get data
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.json(err);
  }
});

//post data
router.post("/", async (req, res) => {
  const item = new Item({
    description: req.body.description,
  });

  try {
    const savedItem = await item.save();
    res.json(savedItem);
  } catch (err) {
    res.json(err);
  }
});

//get specific item
router.get("/:description", async (req, res) => {
  try {
    const item = await Item.find({ description: req.params.description });
    res.json(item);
  } catch (err) {
    res.json(err);
  }
});

//delete
router.delete("/:description", async (req, res) => {
  try {
    const removedItem = await Item.remove({
      description: req.params.description,
    });
    res.json(removedItem);
  } catch (err) {
    res.json(err);
  }
});

//update
router.patch("/:description", async (req, res) => {
  try {
    const updatedItem = await Item.updateOne(
      { description: req.params.description },
      { $set: { description: req.body.description } }
    );
    res.json(updatedItem);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
