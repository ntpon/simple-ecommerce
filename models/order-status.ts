import mongoose, { Schema } from "mongoose"

// Order Schema
const OrderStatusSchema = new Schema(
  {
    cartItem: {
      type: mongoose.Types.ObjectId,
      ref: "CartItem",
      required: true,
    },
    createBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model("OrderStatus", OrderStatusSchema)
