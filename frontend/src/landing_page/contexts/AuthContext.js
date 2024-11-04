// import axios from "axios";
// import httpStatus from "http-status";
// import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";


// export const AuthContext = createContext({});

// const client = axios.create({
//     baseURL: "http://localhost:3003/api/v1/users"
// })

// export const AuthProvider = ({ children }) => {

//     const authContext = useContext(AuthContext);
//     const [userData, setUserData] = useState(authContext);
//     const router = useNavigate();
//     const handleRegister = async (name, username, password) => {
//         try {
//             let request = await client.post("/register", {
//                 name: name,
//                 username: username,
//                 password: password
//             })


//             if (request.status === httpStatus.CREATED) {
//                 return request.data.message;
//             }
//         } catch (err) {
//             throw err;
//         }
//     }
//     const handleLogin = async (username, password) => {
//         try {
//             let request = await client.post("/login", {
//                 username: username,
//                 password: password
//             });

//             console.log(username, password)
//             console.log(request.data)

//             // if (request.status === httpStatus.OK) {
//             if (request.status === 200) {
//                 localStorage.setItem("token", request.data.token);
//                 router("/home")
//             }
//         } catch (err) {
//             throw err;
//         }
//     }
//     const getHistoryOfUser = async () => {
//         try {
//             let request = await client.get("/get_all_activity", {
//                 params: {
//                     token: localStorage.getItem("token")
//                 }
//             });
//             return request.data
//         } catch
//          (err) {
//             throw err;
//         }
//     }
//     const data = {
//         userData, setUserData, handleLogin,handleRegister
//     }
//     return (
//         <AuthContext.Provider value={data}>
//             {children}
//         </AuthContext.Provider>
//     )

// }

import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:3003/api/v1/users"
});

export const AuthProvider = ({ children }) => {
    const authContext = useContext(AuthContext);
    const [userData, setUserData] = useState(authContext);
    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            });

            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            console.error("Registration error:", err);
            throw err;
        }
    };

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });
            console.log(username, password)
            console.log(request.data)
            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                // setUserData(request.data.user); // Store user data after login
                router("/");
            }
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    };

    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data;
        } catch (err) {
            console.error("Error fetching user history:", err);
            throw err;
        }
    };

    const data = {
        userData,
        setUserData,
        handleLogin,
        handleRegister,
        getHistoryOfUser
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};