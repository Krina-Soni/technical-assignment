import express from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";
import { protect } from "../middleware/auth";

const router = express.Router();

router.get("/", protect, async (req: any, res) => {
  const cart: any = await Cart.findOne({ userId: req.user._id });
  if (!cart) return res.json({ items: [] });

 
  const itemsWithDetails = await Promise.all(
    cart.items.map(async (item: any) => {
      const product = await Product.findById(item.productId);
      return { 
        productId: item.productId,
        quantity: item.quantity,
        product 
      };
    })
  );

  res.json({ _id: cart._id, items: itemsWithDetails });
});

router.post("/add", protect, async (req: any, res) => {
  const { productId, quantity } = req.body;
  let cart: any = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = new Cart({ userId: req.user._id, items: [] });
  }

  const itemIndex = cart.items.findIndex((i: any) => i.productId.toString() === productId);

  if (itemIndex > -1) {
   
   
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

router.put("/update", protect, async (req: any, res) => {
 
 
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user._id },
    { $set: { items: req.body.items } },
    { new: true }
  );
  res.json(cart);
});

export default router;