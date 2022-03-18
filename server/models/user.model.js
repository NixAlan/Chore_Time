const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter A Name"],
      minlength: [3, "Name's length must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter a Password"],
      minLength: [5, "Password must be longer than 5 characters "],
    },
  },
  { timeseries: true }
);

// virtual field
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));
//middleware
UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must match");
    console.log("passwords do not match");
  }
  next();
});

UserSchema.pre("save", function (next) {
  console.log("in pre save");

  bcrypt.hash(this.password, 10).then((hashedPassword) => {
    this.password = hashedPassword;
    next();
  });
});
// User is the collection name
const User = mongoose.model("User", UserSchema);

module.exports = User;
