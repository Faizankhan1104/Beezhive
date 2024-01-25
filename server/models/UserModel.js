const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  userType: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  resumes: [
    {
      fileName: {
        type: String,
        required: true,
      },
      filePath: {
        type: String,
        required: true,
      },
    },
  ],
});
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
