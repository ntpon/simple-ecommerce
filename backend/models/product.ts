import mongoose, { Schema } from "mongoose"

// Product Schema
const ProductSchema = new Schema(
  {
    sku: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
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
      trim: true,
    },
    quantity: {
      type: Number,
      default: 0,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
    },
    taxable: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
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

module.exports = mongoose.model("Product", ProductSchema)
