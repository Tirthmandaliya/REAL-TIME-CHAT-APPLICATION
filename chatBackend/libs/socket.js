import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

// Track online users { userId: socketId }
const userSocketMap = {};

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"], // Frontend allowed
        credentials: true,
    },
});

// Helper to get receiver's socketId
export const getReciverSocketId = (userId) => userSocketMap[userId];

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
        userSocketMap[userId] = socket.id;
        console.log(` User ${userId} is online`);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Broadcast online users

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);

        if (userId && userSocketMap[userId]) {
            delete userSocketMap[userId];
            console.log(`User ${userId} went offline`);
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };
