import mongoose, { Schema } from "mongoose"

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    phoneNumber: {
      type: String,
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
    role: {
      type: String,
      enum: ["user", "viewer", "admin"],
      default: "user",
    },
    provider: {
      type: String,
      enum: ["system", "facebook", "google"],
      default: "system",
    },
    status: {
      type: String,
      enum: ["on", "off"],
      default: "on",
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
)

// userSchema.plugin(uniqueValidator);

export default mongoose.model("User", userSchema)
