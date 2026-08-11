import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "New",
    },

    assignedAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default
  mongoose.models.Lead ||
  mongoose.model("Lead", LeadSchema);