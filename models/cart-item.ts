import mongoose, { Schema } from "mongoose"

const CartItemSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
      },
    },
    purchasePrice: {
      type: Number,
      default: 0,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    // priceWithTax: {
    //   type: Number,
    //   default: 0,
    //   required: true,
    // },
    // totalTax: {
    //   type: Number,
    //   default: 0,
    //   required: true,
    // },
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

export default mongoose.model("CartItem", CartItemSchema)
