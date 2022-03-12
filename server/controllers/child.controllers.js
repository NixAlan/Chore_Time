const Child = require("../models/child.model");

module.exports = {
  findAllChildren: (req, res) => {
    Child.find()
      .then((allKids) => {
        console.log(allKids);
        res.json(allKids);
      })
      .catch((err) => {
        console.log("find All Kids Failed");
        res.status(400).json({ message: "Find All Kids Failed", error: err });
      });
  },

  createChild: (req, res) => {
    Child.create(req.body)
      .then((newChild) => {
        console.log(newChild);
        res.json(newChild);
      })
      .catch((err) => {
        console.log("Create Child Failed");
        res.status(400).json({ message: "Create Child Failed", error: err });
      });
  },

  getOneChild: (req, res) => {
    Child.findOne({ _id: req.params.id })
      .then((oneChild) => {
        console.log(oneChild);
        res.json(oneChild);
      })
      .catch((err) => {
        console.log("Find one child Failed");
        res.status(400).json({ message: "Find one child Failed", error: err });
      });
  },

  deleteOneChild: (req, res) => {
    Child.deleteOne({ _id: req.params.id })
      .then((deleteOneChild) => {
        console.log(deleteOneChild);
        res.json(deleteOneChild);
      })
      .catch((err) => {
        console.log("Delete one Child Failed");
        res
          .status(400)
          .json({ message: "Delete one Child Failed", error: err });
      });
  },

  updateOneChild: (req, res) => {
    Child.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updateOneChild) => {
        console.log(updateOneChild);
        res.json(updateOneChild);
      })
      .catch((err) => {
        console.log("update one child Failed");
        res
          .status(400)
          .json({ message: "update one child Failed", error: err });
      });
  },
};
