import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import equinexLogo from './logo.png'; // Ensure this path is correct

const Logout = () => {
    const navigate = useNavigate();
    const { setUserData } = useContext(AuthContext);

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await fetch('/logout', {
                    method: 'GET', // Adjust method as per backend setup
                    credentials: 'include', // Include cookies for session-based auth
                });

                if (response.ok) {
                    setUserData(null); // Clear userData in context
                    console.log("Logged out successfully");
                    navigate('/'); // Redirect to homepage or login page
                } else {
                    console.error('Logout failed');
                }
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };

        logoutUser();
    }, [navigate, setUserData]);

    return (
        <div className="container-fluid d-flex min-vh-100">
            {/* Left Side: Black Background with Logo and Welcome Message */}
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center text-white" style={{ backgroundColor: '#000' }}>
                <img src={equinexLogo} alt="Equinex Logo" style={{ width: '350px', height: '350px' }} />
                <h1 className="mt-3">Thank you for visiting Equinex</h1>
                <p>We hope to see you again soon!</p>
            </div>

            {/* Right Side: Logout Message */}
            <div className="col-md-6 d-flex justify-content-center align-items-center">
                <div className="card shadow-sm p-4 text-center" style={{ width: '90%', maxWidth: '500px' }}>
                    <h2 className="mb-4">Logging out...</h2>
                    <p>Please wait while we log you out.</p>
                </div>
            </div>
        </div>
    );
};

export default Logout;
