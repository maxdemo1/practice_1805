import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sale: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Product = mongoose.model("product", productSchema);
