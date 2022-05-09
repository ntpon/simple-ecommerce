import mongoose, { Schema } from "mongoose"
const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
        default: null,
      },
      url: {
        type: String,
        required: true,
        default: null,
      },
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
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

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Author", AuthorSchema)
