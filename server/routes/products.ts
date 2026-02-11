import express from "express";
import Product from "../models/Product";
import { protect, admin } from "../middleware/auth";

const router = express.Router();

router.get("/", async (req, res) => {
  const query: any = {};
  
 
  if (req.query.category) {
    query.category = req.query.category; 
   
  }

 
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) query.price.$gte = req.query.minPrice;
    if (req.query.maxPrice) query.price.$lte = req.query.maxPrice;
  }

  if (req.query.search) {
   
    query.name = { $regex: req.query.search, $options: "i" };
  }

  const products = await Product.find(query);
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.post("/", protect, admin, async (req, res) => {
  const product = new Product(req.body);
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export default router;