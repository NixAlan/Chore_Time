const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  allowanceEarned: {
    type: Number,
  },
});

const Child = mongoose.model("Child", ChildSchema);

module.exports = Child;
