import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["none", "basic", "premium", "pro"],
    default: "none",
  },
  discount: {
    type: Number,
    default: 0,
  },
  validUntil: Date,
});

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["student", "teacher", "partner", "affiliate", "admin"],
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "active"],
      default: "active",
    },

    // 🔥 SUBSCRIPTION
    membership: {
      type: membershipSchema,
      default: () => ({}),
    },

    /* STUDENT */
    firstName: String,
    lastName: String,
    phone: String,
    educationLevel: String,

    /* TEACHER */
    institutionName: String,
    subjects: [String],
    skills: [String],
    interests: [String],

    /* PARTNER */
    businessName: String,
    address: String,
    industry: String,

    /* AFFILIATE */
    fullName: String,
    bkashNumber: String,

    username: {
      type: String,
      unique: true,
      sparse: true,
      default: undefined,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);