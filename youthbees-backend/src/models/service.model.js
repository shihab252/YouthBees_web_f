import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  tag: {
    type: String,
    default: "",
  },

  popular: {
    type: Boolean,
    default: false,
  },

  features: [String],
});

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
    },

    shortDescription: String,

    description: String,

    banner: String,

    plans: [planSchema],

    active: {
      type: Boolean,
      default: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Service",
  serviceSchema
);