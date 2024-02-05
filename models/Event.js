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
    startDate: {
      type: Date,
      required: true,
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
    /*volunteers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],*/
  },
  { timestamps: true }
);

const eventAttendanceSchema = new Schema( {
  user: {
    type: ObjectId,
    ref: "User",
  }, 
  event: {
    type: ObjectId,
    ref: "Event",
  },
  isAttend: {
    type: Boolean,
    default: false,
  }
})

export default mongoose.model("Event", eventSchema);
