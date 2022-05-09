import mongoose, { Schema } from "mongoose"

// Order Schema
const OrderSchema = new Schema(
  {
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Order", OrderSchema)
