import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    batchName: {
      type: String,
      required: true,
      trim: true,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    scheduleDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

lectureSchema.index(
  { instructor: 1, scheduleDate: 1 },
  { unique: true }
);

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;