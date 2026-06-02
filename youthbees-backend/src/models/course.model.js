import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
});

const sectionSchema = new mongoose.Schema({
  title: String,
  lectures: [lectureSchema],
});

const liveSessionSchema = new mongoose.Schema({
  title: String,
  platform: String, // zoom / google meet
  meetingLink: String,
  meetingDate: Date,
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
  type: String,
  enum: ["draft", "published"],
  default: "published",
},

    description: String,

    category: String,

    banner: String,

    price: {
      type: Number,
      default: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    teacherName: String,

    sections: [sectionSchema],

    // 🔥 LIVE PRIVATE SESSIONS
    liveSessions: [liveSessionSchema],

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);