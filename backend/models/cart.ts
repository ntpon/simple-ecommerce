import mongoose, { Schema } from "mongoose"

// Cart Schema
const CartSchema = new Schema(
  {
    products: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "CartItem",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

export default mongoose.model("Cart", CartSchema)
