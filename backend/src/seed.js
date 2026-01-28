import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import products from './data/products.js'
import users from "./data/users.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import connectDB from "./config/db.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((p) => ({
      ...p,
      user: adminUser,
    }));

    await Product.insertMany(sampleProducts);

    console.log(" Data Imported!");
    process.exit();
  } catch (error) {
    console.error(" Error while seeding:", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("🗑️ Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(" Error while destroying:", error);
    process.exit(1);
  }
};

// Run with:  node src/seeder.js OR node src/seeder.js -d
if (process.argv[2] === "-d") {
  await destroyData();
} else {
  await importData();
}
