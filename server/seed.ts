import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product";
import User from "./models/User";
import Order from "./models/Order";
import bcrypt from "bcryptjs";

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.DATABASE_URL!);
  
  await Product.deleteMany({});
  await User.deleteMany({});
  await Order.deleteMany({});

  const adminPassword = await bcrypt.hash("admin123", 8);
  const userPassword = await bcrypt.hash("user123", 8);

  const users = await User.insertMany([
    { name: "Admin User", email: "admin@test.com", password: adminPassword, role: "admin" },
    { name: "Super Admin", email: "superadmin@test.com", password: adminPassword, role: "superadmin" },
    { name: "Test Customer", email: "user@test.com", password: userPassword, role: "customer" }
  ]);

  const categories = ["Electronics", "Clothing", "Home", "Books", "Toys"];
  const products = [];

  for (let i = 1; i <= 45; i++) {
    products.push({
      name: `Product ${i}`,
      description: `Description for product ${i}`,
      price: Math.floor(Math.random() * 100) + 9.99,
      inventory: Math.floor(Math.random() * 50) + 1,
      category: categories[i % categories.length],
      images: ["https://via.placeholder.com/300"]
    });
  }

  products.push({
    name: "Cheap Pin",
    description: "Smallest price",
    price: 0.01,
    inventory: 100,
    category: "Misc",
    images: ["https://via.placeholder.com/300"]
  });

  products.push({
    name: "Out of Stock Item",
    description: "You cannot buy this",
    price: 99.99,
    inventory: 0,
    category: "Misc",
    images: ["https://via.placeholder.com/300"]
  });

  products.push({
    name: "Very Long Name Product " + "A".repeat(100),
    description: "Product with a very long name for UI testing",
    price: 49.99,
    inventory: 10,
    category: "Misc",
    images: ["https://via.placeholder.com/300"]
  });

  products.push({
    name: "XSS Test Product",
    description: "This contains a script <script>alert(\"XSS\")</script>",
    price: 19.99,
    inventory: 5,
    category: "Misc",
    images: ["https://via.placeholder.com/300"]
  });

  products.push({
    name: "Unicode Product 🚀🔥",
    description: "Testing accents and emojis: áéíóú ñ",
    price: 29.99,
    inventory: 20,
    category: "Misc",
    images: ["https://via.placeholder.com/300"]
  });

  await Product.insertMany(products);

  console.log("Database seeded!");
  process.exit();
};

seed();