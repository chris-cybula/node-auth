const express = require("express");
const router = express.Router();
const verify = require("../utils/verifyToken");
const { appValidation } = require("../utils/validation.js");

const Item = require("../models/Item");
const User = require("../models/User");

router.get("/", verify, async (req, res) => {
  try {
    const data = await User.find({ _id: req.user });
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", verify, async (req, res) => {
  let errors = null;
  let itemExists = null;

  const { error } = appValidation(req.body);
  if (error) {
    errors = error.details;
  }

  const user = await User.find({ _id: req.user });

  if (user[0]["data"].includes(req.body.item) === true) {
    itemExists = true;
  }

  if (error || itemExists === true)
    return res.status(400).send({ errors: errors, itemExists: itemExists });

  try {
    User.findByIdAndUpdate(req.user, { $push: { data: req.body.item } }).exec();
    res.json("ok");
  } catch (err) {
    res.json(err);
  }
});

//delete
router.delete("/:description", verify, async (req, res) => {
  try {
    User.findByIdAndUpdate(req.user, {
      $pull: { data: req.params.description },
    }).exec();
    res.json("ok");
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
