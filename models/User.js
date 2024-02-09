import mongoose from "mongoose";

const { Schema } = mongoose;

const { ObjectId } = mongoose.Schema;

const userSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      max: 100,
      min: 1,
    },
    skills: [{ type: String }],
    interest: [{ type: String }],
    phoneNumber: {
      type: String,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    occupation: {
      type: String,
    },
    school: {
      type: String,
    },
    canDrive: {
      type: Boolean,
      default: false,
    },
    ownVehicle: {
      type: Boolean,
      default: false,
    },
    immigrationStatus: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
