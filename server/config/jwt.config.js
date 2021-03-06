const jwt = require("jsonwebtoken");

module.exports = {
  authenticate(req, res, next) {
    // usertoken is the cookie I created in the userController login
    jwt.verify(
      req.cookies.usertoken,
      process.env.JWT_SECRET,
      (err, payload) => {
        if (err) {
          console.log(err);
          res.status(401).json({ verified: false });
        } else {
          console.log(payload);
          req.jwtpayload = payload;
          next();
        }
      }
    );
  },
};
