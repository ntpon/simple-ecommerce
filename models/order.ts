import mongoose, { Schema } from "mongoose"

// Order Schema
const OrderSchema = new Schema(
  {
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    orderStatus: [
      {
        type: mongoose.Types.ObjectId,
        ref: "OrderStatus",
      },
    ],
    total: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model("Order", OrderSchema)
