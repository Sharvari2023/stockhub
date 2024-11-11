// chatServer.js
/*
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Adjust this to match your frontend URL
        methods: ["GET", "POST"],
    },
});

// Store connected users if needed
const users = new Map();

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Listen for incoming messages
    socket.on("send_message", (msg) => {
        console.log("Message received:", msg);
        io.emit("receive_message", msg); // Broadcasts the message to all connected clients
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        users.delete(socket.id);
    });
});

// Start the server on port 3003
const PORT = 8081;
server.listen(PORT, () => {
    console.log(`Chat server is running on http://localhost:${PORT}`);
});
*/
// chatServer.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Adjust this to match your frontend URL
        methods: ["GET", "POST"],
    },
});

// Store active users (socket.id -> username)
const users = new Map();

// Send the list of users to the client on connection
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Add user to the users map
    socket.on("set_username", (username) => {
        users.set(socket.id, username);
        io.emit("user_list", Array.from(users.values())); // Emit the user list to all clients
    });

    // Listen for incoming messages
    socket.on("send_message", (msg) => {
        const recipientSocketId = [...users].find(([id, username]) => username === msg.to)?.[0];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("receive_message", msg); // Send message to specific user
        }
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        users.delete(socket.id);
        io.emit("user_list", Array.from(users.values())); // Update the user list for all clients
    });
});

// Start the server on port 8081
const PORT = 8081;
server.listen(PORT, () => {
    console.log(`Chat server is running on http://localhost:${PORT}`);
});
