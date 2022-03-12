const Child = require("../models/child.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = {
  findAllChildren: (req, res) => {
    Child.find()
      .populate("createdBy", "username email") // I can use populate on any method to get needed fields from user model
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
    const newChildObject = new Child(req.body);
    // when user logs in there is a cookie in the request,
    //we name the cookie usertoken in the user controller
    //.
    //.
    // const decodedJWT = jwt.decode(req.cookies.usertoken, {
    //   complete: true,
    // });
    //.
    //.
    //adding feild of createdBy to the newChildObject
    //with the value of cookie usertoken's payload
    //.
    //.newChildObject.createdBy = decodedJWT.payload.id;
    //.
    //.
    // I can use req.jwtpayload from authenticate middlewere created in jwt.config
    newChildObject.createdBy = req.jwtpayload.id;
    //.
    //.
    //.
    // console.log("devlog", newChildObject, decodedJWT.payload);
    newChildObject
      .save()
      .then((newChild) => {
        console.log(newChild);
        res.json(newChild);
      })
      .catch((err) => {
        console.log("Create Child Failed1");
        res.status(400).json({ message: "Create Child Failed1", error: err });
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

  findAllChildrenByUser: (req, res) => {
    if (req.jwtpayload.username !== req.params.username) {
      User.findOne({ username: req.params.username }) // need to require User / Calling findOne User in the child controllers
        .then((userNotLoggedIn) => {
          Child.find({ createdBy: userNotLoggedIn._id })
            .then((allGamesFromUser) => {
              console.log(allGamesFromUser);
              res.json(allGamesFromUser);
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json(err);
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    } else {
      Child.find({ createdBy: req.jwtpayload.id })
        .then((allChildrenFromLoggedInUser) => {
          console.log(allChildrenFromLoggedInUser);
          res.json(allChildrenFromLoggedInUser);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  },
};
