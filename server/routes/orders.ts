import express from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import Cart from "../models/Cart";
import { protect } from "../middleware/auth";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" as any });

router.post("/checkout", protect, async (req: any, res) => {
  const { items, shippingAddress, total, paymentMethodId } = req.body;

 
 
 

  try {
   
    for (const item of items) {
      const product: any = await Product.findById(item.productId);
      if (product.inventory < item.quantity) {
        return res.status(400).json({ message: `Product ${product.name} out of stock` });
      }
    }

   
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: { enabled: true, allow_redirects: "never" }
    });

   
    for (const item of items) {
      const product: any = await Product.findById(item.productId);
      product.inventory -= item.quantity;
      await product.save();

     
      req.io.emit("inventory-update", { 
        productId: product._id, 
        newInventory: product.inventory 
      });
    }

    const order = await Order.create({
      userId: req.user._id,
      items,
      total,
      shippingAddress,
      paymentIntentId: paymentIntent.id,
      status: "paid"
    });

   
    await Cart.deleteOne({ userId: req.user._id });

    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/myorders", protect, async (req: any, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort("-createdAt");
  res.json(orders);
});

export default router;