const express = require("express");
const router = express.Router();
const verify = require("../utils/verifyToken");
const { appValidation } = require("../utils/validation.js");
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

module.exports = router;
