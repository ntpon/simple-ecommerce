import mongoose, { Schema } from "mongoose"

// Product Schema
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      slug: "name",
      required: true,
    },
    image: {
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    images: [
      {
        public_id: {
          type: String,
          default: null,
        },
        url: {
          type: String,
          default: null,
        },
      },
    ],
    description: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 0,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
      },
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },
    taxable: {
      type: Boolean,
      default: false,
    },
    publisher: {
      type: mongoose.Types.ObjectId,
      ref: "Publisher",
    },
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    authors: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Author",
        required: true,
      },
    ],
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
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["on", "off"],
      default: "on",
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("Product", ProductSchema)
