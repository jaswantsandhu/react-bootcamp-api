const { Schema, model, mongo } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

const UsersModel = model("users", UserSchema, "users");

module.exports = UsersModel;
