import mongoose from "mongoose";
const authorSchema = mongoose.Schema(
  {
    uid: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const AuthorModel = mongoose.model("Author", authorSchema);
export default AuthorModel;
