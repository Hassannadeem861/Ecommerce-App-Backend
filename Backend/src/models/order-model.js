import mongoose from "mongoose";
// import shippingInfoSchema from "../models/shipping-info-model.js"; // ShippingInfo ko import karna
// import OrderItemSchema from "../models/order-item-model.js"; // OrderItem ko import karna

const orderSchema = new mongoose.Schema(
  {
    // shippingInfoSchema: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "ShippingInfo",
    //   required: true,
    // },

    // OrderItemSchema: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "OrderItem",
    //     required: true,
    //   },
    // ],

    shippingInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      phoneNumber: {
        type: Number,
        required: true,
        validate: {
          validator: (v) => /\d{10,15}/.test(v),
          message: "Phone number must be 10 to 15 digits long",
        },
      },
      pinCode: { type: Number, required: true },
    },

    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: false },
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    paymentInfo: {
      id: { type: String, required: true },
      status: { type: String, required: true },
    },

    paidAt: {
      type: Date,
      required: true,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },

    deliveredAt: Date,  
  },

  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
