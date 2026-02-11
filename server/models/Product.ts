import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, 
  inventory: { type: Number, required: true }, 
  category: { type: String, required: true },
  images: [{ type: String }],
  isActive: { type: Boolean, default: true } 
}, { 
  timestamps: true,
  versionKey: false 
});

export default mongoose.model("Product", ProductSchema);