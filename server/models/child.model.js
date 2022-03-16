const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    allowanceEarned: {
      type: Number,
    },
    creditEarned: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timeseries: true }
);

const Child = mongoose.model("Child", ChildSchema);

module.exports = Child;
