import mongoose, { Schema } from "mongoose"

const contactSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["on", "off"],
      default: "on",
    },
  },
  { timestamps: true }
)

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Contact", contactSchema)
