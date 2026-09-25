import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    // Remove existing users
    await User.deleteMany({});

    const hashedAdminPassword = await bcrypt.hash("Admin@123", 10);
    const hashedInstructorPassword = await bcrypt.hash(
      "Instructor@123",
      10
    );

    const users = [
      {
        name: "Admin",
        email: "admin@ideamagix.com",
        password: hashedAdminPassword,
        role: "admin",
      },
      {
        name: "Rahul Sharma",
        email: "rahul@ideamagix.com",
        password: hashedInstructorPassword,
        role: "instructor",
      },
      {
        name: "Priya Patil",
        email: "priya@ideamagix.com",
        password: hashedInstructorPassword,
        role: "instructor",
      },
      {
        name: "Amit Kumar",
        email: "amit@ideamagix.com",
        password: hashedInstructorPassword,
        role: "instructor",
      },
    ];

    await User.insertMany(users);

    console.log("Demo users created successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error.message);
    process.exit(1);
  }
};

seedUsers();