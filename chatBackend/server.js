import express from "express"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./libs/db.js";
import cookieParser from "cookie-parser";
import {app,server} from "./libs/socket.js";

dotenv.config();


const port = process.env.PORT;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());

const allowedOrigins = [
  "https://your-frontend.vercel.app",  // Vercel frontend URL
  "http://localhost:5173"              // Optional for development
];

app.use(cors({
        origin: allowedOrigins,
        credentials:true,
    })
);

app.use('/api/auth',authRoutes);

app.use('/api/messages',messageRoutes);

server.listen(port, () =>{ 
    console.log(`port is running on ${port}`);
    connectDB();
});