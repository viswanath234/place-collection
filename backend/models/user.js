const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});

userSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    next(new Error("Email already exists"));
  } else {
    next(error);
  }
});
module.exports = mongoose.model("User", userSchema);
