const Chore = require("../models/chore.model");

module.exports = {
  getAllChores: (req, res) => {
    Chore.find()
      .then((allChores) => {
        console.log(allChores);
        res.json(allChores);
      })
      .catch((err) => {
        console.log("Find All Chores Failed");
        res.status(400).json({ message: "Find all chores failed" });
      });
  },

  creatNewChore: (req, res) => {
    Chore.create(req.body)
      .then((newChore) => {
        console.log(newChore);
        res.json(newChore);
      })
      .catch((err) => {
        console.log("something went wrong creating new chore");
        res.status(400).json({ message: "create chore Failed", error: err });
      });
  },

  getOneChore: (req, res) => {
    Chore.findOne({ _id: req.params.id })
      .then((oneChore) => {
        console.log(oneChore);
        res.json(oneChore);
      })
      .catch((err) => {
        console.log("Find one chore Failed");
        res.status(400).json({ message: "Find one chore Failed", error: err });
      });
  },

  deleteChores: (req, res) => {
    Chore.deleteMany({ completedBy: req.params.completedBy })
      .then((deleteChores) => {
        console.log(deleteChores);

        res.json(deleteChores);
      })
      .catch((err) => {
        console.log("Delete chores Failed");
        res.status(400).json({ message: "Delete chores Failed", error: err });
      });
  },

  updateOneChore: (req, res) => {
    Chore.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updateOneChore) => {
        console.log(updateOneChore);
        res.json(updateOneChore);
      })
      .catch((err) => {
        console.log("update one chore Failed");
        res
          .status(400)
          .json({ message: "update one chore Failed", error: err });
      });
  },
};
