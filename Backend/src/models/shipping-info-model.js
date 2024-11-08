import mongoose from "mongoose";

const shippingInfoSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "Address is required"],
      minlength: [10, "Address should be at least 10 characters long"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      maxlength: [50, "City name should be under 50 characters"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
      maxlength: [50, "State name should be under 50 characters"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      maxlength: [50, "Country name should be under 50 characters"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10,15}$/, "Phone number should be 10 to 15 digits long"], // Ensures phone number is numeric with specific length
    },
    pinCode: {
      type: String,
      required: [true, "Pin code is required"],
      match: [/^\d{5,10}$/, "Pin code should be between 5 to 10 digits"], // Ensures pin code is numeric
    },
  },
  { timestamps: true }
);

// ShippingInfo model
const ShippingInfo = mongoose.model("ShippingInfo", shippingInfoSchema);
export default ShippingInfo;
