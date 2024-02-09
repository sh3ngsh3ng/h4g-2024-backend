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
    volunteerCert: [{ type: String }],
    skillCert: [{ type: ObjectId, ref: "SkillCert" }],
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
  },
  { timestamps: true }
);

const skillCertSchema = new Schema({
  cert: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);
export const SkillCert = mongoose.model("SkillCert", skillCertSchema);
