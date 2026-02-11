import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true },
    priceAtTime: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["pending", "paid", "shipped", "cancelled"], 
    default: "pending" 
  },
  paymentIntentId: { type: String },
  shippingAddress: { type: Object },
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);