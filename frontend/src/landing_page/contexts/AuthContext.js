import axios from "axios"; // Axios for making HTTP requests
import httpStatus from "http-status"; // For handling HTTP status codes
import { createContext, useContext, useState, useEffect } from "react"; // React context and hooks
import { useNavigate } from "react-router-dom"; // Hook for navigation

// Create a context for authentication
export const AuthContext = createContext({});

// Create an Axios instance with a base URL for user-related API requests
const client = axios.create({
    baseURL: "http://localhost:3003/api/v1/users" // Base URL for API endpoints
});

// AuthProvider component to wrap the application and provide auth context
export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null); // State to hold user data
    const router = useNavigate(); // Hook for navigation

    // Check if the user data is available in localStorage on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const storedUserData = localStorage.getItem("userData");
            if (storedUserData) {
                try {
                    const parsedUserData = JSON.parse(storedUserData);
                    setUserData(parsedUserData); // Parse and set user data
                } catch (err) {
                    console.error("Error parsing user data from localStorage:", err);
                    localStorage.removeItem("userData"); // Optionally remove corrupted user data
                }
            } else {
                console.warn("User data not found in localStorage.");
            }
        }
    }, []); // This effect runs only once on component mount

    // Async function to handle user registration
    const handleRegister = async (username, email, password) => {
        try {
            // Send POST request to register a new user
            const request = await client.post("/signup", { username, email, password });

            // Check if the request was successful and has the expected structure
            if (request && request.data) {
                console.log('Registration Response:', request.data);

                if (request.data.success) {
                    return request.data.message || "Registration successful";
                } else {
                    throw new Error("Registration failed: No success field in response.");
                }
            } else {
                throw new Error("Registration failed: Invalid response from server.");
            }
        } catch (err) {
            console.error("Registration error:", err); // Log registration error
            throw err; // Propagate error
        }
    };

    // Async function to handle user login
    const handleLogin = async (username, password) => {
        try {
            const request = await client.post("/login", { username, password });
            console.log('Request payload:', { username, password });
            console.log('Response data:', request.data);

            if (request.status === httpStatus.OK && request.data.token) {
                localStorage.setItem("token", request.data.token);
                localStorage.setItem("userData", JSON.stringify(request.data.user));
                setUserData(request.data.user); // Store and update user data
                router("/"); // Redirect to home page after successful login
            } else {
                console.error("Login failed: Invalid response from server.");
            }
        } catch (err) {
            console.error('Login error:', err); // Log login error
        }
    };

    // Async function to get the user's activity history
    const getHistoryOfUser = async () => {
        try {
            // Send GET request to fetch user activity history
            const request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token") // Send token as a query parameter
                }
            });
            return request.data; // Return activity data
        } catch (err) {
            console.error("Error fetching user history:", err); // Log error while fetching history
            throw err; // Propagate error
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from localStorage
        localStorage.removeItem("userData"); // Remove user data from localStorage
        setUserData(null); // Reset user data state
        router("/login"); // Redirect to login page after logout
    };

    // Context value to provide to children components
    const data = {
        userData, // Current user data
        setUserData, // Function to update user data
        handleLogin, // Function to handle login
        handleRegister, // Function to handle registration
        getHistoryOfUser, // Function to get user's activity history
        handleLogout // Function to handle logout
    };

    // Provide the context value to children components
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
