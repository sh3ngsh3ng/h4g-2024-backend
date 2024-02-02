import mongoose from "mongoose";

const { Schema } = mongoose;

const { ObjectId } = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    uid: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema)