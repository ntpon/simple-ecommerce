import mongoose, { Schema } from "mongoose"

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    isRecommend: {
      type: Boolean,
      required: true,
      default: false,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      required: true,
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

export default mongoose.model("Category", CategorySchema)
