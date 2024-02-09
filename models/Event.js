import mongoose from "mongoose";
const { Schema } = mongoose;

const { ObjectId } = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    organization: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    maxHoursGiven: {
      type: Number,
      required: true,
    },
    interest: [{ type: String }],
    skills: [{ type: String }],
    isCompleted: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    volunteers: [
      {
        type: String,
      },
    ],
    images: [{ type: String }]
  },
  { timestamps: true }
);

const eventAttendanceSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  event: {
    type: ObjectId,
    ref: "Event",
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  school: {
    type: String,
    default: "-",
  },
  age: {
    type: Number,
    max: 100,
    min: 1,
  },
  isAttend: {
    type: Boolean,
    default: false,
  },
});

export const Event = mongoose.model("Event", eventSchema);
export const EventAttendance = mongoose.model(
  "EventAttendance",
  eventAttendanceSchema
);
