import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [2, "minimum 2 letters required"],
      required: true,
    },
    lastName: {
      type: String,
      minLength: [2, "minimum 2 letters required"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
      required: true
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema)
export default User;
