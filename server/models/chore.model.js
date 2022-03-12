const mongoose = require("mongoose");

const ChoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    completedBy: {
      type: String,
    },
    credit: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Chore = mongoose.model("Chore", ChoreSchema);

module.exports = Chore;
