import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

function Navbar() {
    const { userData, setUserData } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token from localStorage
        setUserData(null); // Reset user data to indicate logout
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav
            className="navbar navbar-expand-lg border-bottom"
            style={{
                backgroundColor: "#1e231c",
                borderBottom: "10px solid gray",
                height: "80px",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px"
            }}
        >
            {/* Left Section: Logo */}
            <a className="navbar-brand" href="#" style={{color:"white",fontStyle:"inherit"}}>
               
                <img src="media/images/logo.png" style={{ width: "50px" }} alt="Logo" />
                 EQUINEX
            </a>

            {/* Center Section: Search Bar */}
            <form className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{ width: "300px", backgroundColor: "white" ,borderRadius:"27px"}}
                />
                <button className="btn" type="submit" style={{ backgroundColor: '#96e856', color: 'black', height: '50px', justifyContent: 'center',borderRadius:"10px", padding: '9px', marginBottom: '5px' }}>
                    Search
                </button>
            </form>

            <ul className="navbar-nav d-flex align-items-center" style={{ gap: "1rem", marginBottom: 0 }}>
                <li className="nav-item">
                    <Link className="nav-link active text-white" to="/chat">
                        Chats
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active text-white" to="/dashboard">
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active text-white" to="/news">
                        News
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active text-white" to="/about">
                        About
                    </Link>
                </li>

                {!userData ? (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link active text-white" to="/signup">
                                SignUp
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-white" to="/login">
                                Login
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link active text-white" to="/logout" onClick={handleLogout}>
                                Logout
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <button
                                className="btn nav-link active text-white"
                                onClick={toggleDropdown}
                                style={{ backgroundColor: "transparent", border: "none" }}
                            >
                                <i className="fas fa-user fa-lg text-white"></i>
                            </button>
                            {/* Conditionally render dropdown */}
                            {dropdownOpen && (
                                <ul
                                    className="dropdown-menu show" // Use "show" class for visibility
                                    style={{
                                        display: "block",
                                        position: "absolute",
                                        top: "60px",
                                        right: "20px",
                                        backgroundColor: "white",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    <li>
                                        <Link className="dropdown-item" to="/profile">
                                            Profile
                                        </Link>
                                    </li>
                                    
                                </ul>
                            )}
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
