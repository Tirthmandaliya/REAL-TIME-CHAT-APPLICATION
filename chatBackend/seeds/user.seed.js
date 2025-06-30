import { config } from "dotenv";
import { connectDB } from "../libs/db.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

config();

const seedUsers = [
  {
    email: "priya.sharma@example.com",
    fullName: "Priya Sharma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    email: "ananya.verma@example.com",
    fullName: "Ananya Verma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    email: "isha.patel@example.com",
    fullName: "Isha Patel",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    email: "sneha.mishra@example.com",
    fullName: "Sneha Mishra",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    email: "aisha.kapoor@example.com",
    fullName: "Aisha Kapoor",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    email: "arjun.yadav@example.com",
    fullName: "Arjun Yadav",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    email: "raj.malhotra@example.com",
    fullName: "Raj Malhotra",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    email: "vivek.singh@example.com",
    fullName: "Vivek Singh",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    email: "rohit.kumar@example.com",
    fullName: "Rohit Kumar",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/24.jpg",
  },
  {
    email: "amit.deshmukh@example.com",
    fullName: "Amit Deshmukh",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    email: "neha.bansal@example.com",
    fullName: "Neha Bansal",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    email: "pallavi.iyer@example.com",
    fullName: "Pallavi Iyer",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/27.jpg",
  },
  {
    email: "kiran.raju@example.com",
    fullName: "Kiran Raju",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/26.jpg",
  },
  {
    email: "rahul.bhatt@example.com",
    fullName: "Rahul Bhatt",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/27.jpg",
  },
  {
    email: "aditya.mehta@example.com",
    fullName: "Aditya Mehta",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/28.jpg",
  }
];


const seedDatabase = async () => {
  try {
    await connectDB();

    // Hash passwords before inserting
    const hashedUsers = await Promise.all(
      seedUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    // Optional: Clear existing users
    await User.deleteMany();

    await User.insertMany(hashedUsers);
    console.log("Database seeded successfully with hashed passwords");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
