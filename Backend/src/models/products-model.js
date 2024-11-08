import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your product name"],
      trim: true,
      lowercase: true,
      index: true,
    },

    description: {
      type: String,
      required: [true, "Enter your product description"],
      trim: true,
      lowercase: true,
    },

    price: {
      type: Number,
      required: [true, "Enter your product price"],
      maxLength: [8, "Price cannot exceed 8 character"],
    },

    // images: [
    //   {
    //     public_id: {
    //       type: String,
    //       required: true,
    //     },
    //     public_url: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],

    productImage: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: [true, "Enter your product category"],
    },

    stock: {
      type: Number,
      required: true,
      maxLength: [4, "Stock cannot exceed 4 character"],
      // default: 1,
    },

    nameOfReviews: {
      type: String,
      required: true,
    },

    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],

    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false,
    },
    
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", productSchema);
export default Products;
