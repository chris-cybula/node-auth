const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "data" }
);

module.exports = mongoose.model("Item", ItemSchema);
