import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Enter your username"],
      lowercase: true,
      trim: true,
      maxlength: [10, "The name should be at least 10 characters long"],
      minlength: [4, "The name should be at least 10 characters long"],
    },
    email: {
      type: String,
      required: [true, "Enter your email"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      // validate: [validator.isEmail, "Email format is not correct"],
      validate: {
        validator: validator.isEmail,
        message: "Email format is not correct",
      },
    },
    password: {
      type: String,
      required: [true, "Enter your password"],
      // select: false,
      // minlength: [6, "The password should be at least 6 characters long"],
    },

    avatar: {
      type: String,
      // required: true,
    },

    refreshToken: {
      type: String,
      // select: false,
    },

    role: {
      type: String,
      default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      password: this.password,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
