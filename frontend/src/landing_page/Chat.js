// src/components/Chat.js
import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { AuthContext } from "./contexts/AuthContext";
import Navbar from "./Navbar"; // Import Navbar
import Footer from "./Footer"; // Import Footer

const socket = io("http://localhost:8081", { transports: ["polling"] }); // Update the URL as per your backend setup

function Chat() {
    const { userData } = useContext(AuthContext); // Assuming AuthContext holds user data
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        // Set the username when the socket connects
        if (userData?.username) {
            socket.emit("set_username", userData.username);
        }

        // Listen for incoming messages
        socket.on("receive_message", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Listen for the list of users
        socket.on("user_list", (userList) => {
            setUsers(userList);
        });

        return () => {
            socket.off("receive_message");
            socket.off("user_list");
        };
    }, [userData]);

    const sendMessage = () => {
        if (message.trim() && selectedUser) {
            const msg = {
                from: userData?.username || "Anonymous",
                to: selectedUser,
                text: message,
            };
            socket.emit("send_message", msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
            setMessage("");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <div style={{ display: "flex", flex: 1, margin: "120px", borderRadius: "4px" }}>
                {/* User list on the left */}
                <div
                    style={{
                        width: "200px",
                        borderRight: "1px solid #ddd",
                        paddingRight: "20px",
                        backgroundColor: "#1c1c1c", // Optional styling for the user list
                    }}
                >
                    <h3>Users</h3>
                    <ul style={{ listStyle: "none", padding: "10px" }}>
                        {users.map((user, index) => (
                            <li
                                key={index}
                                onClick={() => setSelectedUser(user)}
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: selectedUser === user ? "#28a745" : "#fff", // Green for selected user
                                    padding: "5px",
                                    borderRadius: "4px",
                                    marginBottom: "5px",
                                    color: "black",
                                }}
                            >
                                {user}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chat container */}
                <div
                    style={{
                        flex: 1,
                        padding: "20px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: "black",
                        height: "450px", // Optional styling for the chat area
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {selectedUser && (
                        <>
                            <h3>Chat with {selectedUser}</h3>
                            <div
                                className="messages"
                                style={{
                                    maxHeight: "calc(100vh - 160px)", // Adjust this value if needed
                                    overflowY: "auto",
                                    marginBottom: "10px",
                                    flex: 1, // This ensures the messages take up the remaining space
                                }}
                            >
                                {messages
                                    .filter((msg) => msg.to === selectedUser || msg.from === selectedUser)
                                    .map((msg, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                display: "flex",
                                                flexDirection: msg.from === userData?.username ? "row-reverse" : "row",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    backgroundColor: msg.from === userData?.username ? "#007bff" : "#f0f0f0",
                                                    color: msg.from === userData?.username ? "white" : "black",
                                                    padding: "8px",
                                                    borderRadius: "8px",
                                                    maxWidth: "60%",
                                                }}
                                            >
                                                <strong>{msg.from}:</strong> {msg.text}
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {/* Message input at the bottom */}
                            <div className="input-group" style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="form-control"
                                    style={{ flex: 1 }}
                                />
                                <button onClick={sendMessage} className="btn btn-primary">
                                    Send
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Chat;
