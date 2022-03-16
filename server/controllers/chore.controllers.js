const Chore = require("../models/chore.model");
const User = require("../models/user.model");
const childControllers = require("./child.controllers");

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
    const newChoreObject = new Chore(req.body);
    newChoreObject.createdBy = req.jwtpayload.id;
    newChoreObject
      .save()
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

  findAllChoresByUser: (req, res) => {
    if (req.jwtpayload.username !== req.params.username) {
      User.findOne({ username: req.params.username })
        .then((userNotLoggedIn) => {
          Chore.find({ createdBy: userNotLoggedIn._id })
            .then((choresFromUser) => {
              console.log(choresFromUser);
              res.json(choresFromUser);
            })
            .catch((err) => {
              console.log("find chores from logged out user failed 1", err);
              res
                .status(400)
                .json({
                  message: "find chores from logge dout user failed 1",
                  error: err,
                });
            });
        })
        .catch((err) => {
          console.log("find chores from logged out user failed 2", err);
          res
            .status(400)
            .json({
              message: "find chores from logged out user failed 2",
              error: err,
            });
        });
    } else {
      Chore.find({ createdBy: req.jwtpayload.id })
        .then((childrenFromLoggedInUser) => {
          console.log(childrenFromLoggedInUser);
          res.json(childrenFromLoggedInUser);
        })
        .catch((err) => {
          console.log("find chores from loggin user failed", err);
          res.status(400).json("find chores from loggin user failed", err);
        });
    }
  },
};
