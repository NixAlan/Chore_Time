const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req, res) => {
    const user = new User(req.body);

    user
      .save()
      .then((newUser) => {
        console.log(newUser);
        console.log("Successfully Registered");
        res.json({
          successMessage: "Thank you for registering",
          user: newUser,
        });
      })
      .catch((err) => {
        console.log("register not successfull");
        res.status(400).json(err);
      });
  },

  login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((userRecord) => {
        // email was not found
        if (userRecord === null) {
          res.status(400).json({ message: "Invalid login Attempt1" });
        } else {
          // email is found
          bcrypt
            .compare(req.body.password, userRecord.password)
            .then((isPasswordValid) => {
              if (isPasswordValid) {
                console.log("password is valid");
                res
                  .cookie(
                    "usertoken",
                    jwt.sign(
                      {
                        //payload is data we want to save
                        id: userRecord._id,
                        email: userRecord.email,
                        username: userRecord.username,
                      },
                      //we need a key to sign and hash cookie data
                      process.env.JWT_SECRET
                    ),
                    {
                      // make cookies to be read only on the sever side
                      httpOnly: true,
                      expires: new Date(Date.now() + 90000000),
                    }
                  )
                  .json({
                    message: "login successfull",
                    userLoggedIn: userRecord.username,
                    userId: userRecord._id,
                  });
              } else {
                res.status(400).json({
                  message: "login and or email invalid",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ message: "Invalid login Attempt2" });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Invalid login Attempt3" });
      });
  },

  logout: (req, res) => {
    console.log("logging out");
    res.clearCookie("usertoken");
    res.json({
      message: "You have successfully logged out",
    });
  },

  // getOneUser: (req, res) => {
  //   User.findOne({ _id: req.params.id })
  //     .then((oneUser) => {
  //       console.log(oneUser);
  //       res.json(oneUser);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(400).json(err);
  //     });
  // },

  getLoggedInUser: (req, res) => {
    User.findOne({ _id: req.jwtpayload.id }) // req.jwtpayload.id from jwt.config
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

  getAllUsers: (req, res) => {
    User.find()
      .then((allUsers) => {
        console.log(allUsers);
        res.json(allUsers);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};
