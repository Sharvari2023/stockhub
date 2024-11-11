import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import equinexLogo from './logo.png'; // Ensure this path is correct

const Login = () => {
    const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { handleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await handleLogin(username, password);

            if (loginResponse && loginResponse.success) {
                navigate('/'); // Redirect to home page after successful login
            } else {
                setErrorMessage('Login failed: Incorrect credentials');
            }
        } catch (err) {
            setErrorMessage('Error during login: ' + err.message);
        }
    };

    return (
        <div className="container-fluid d-flex min-vh-100">
            {/* Left Side: Black Background with Logo and Welcome Message */}
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center text-white" style={{ backgroundColor: '#000' }}>
                <img src={equinexLogo} alt="Equinex Logo" style={{ width: '350px', height: '350px' }} />
                <h1 className="mt-3">Welcome to Equinex</h1>
                <p>Your Trading Hub</p>
            </div>

            {/* Right Side: Login Form */}
            <div className="col-md-6 d-flex justify-content-center align-items-center">
                <div className="card shadow-sm p-4" style={{ width: '90%', maxWidth: '500px' }}> {/* Increased width */}
                    <h2 className="text-center mb-4">Log In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="username">Username</label>
                            <input 
                                required 
                                className="form-control" 
                                type="text" 
                                id="username" 
                                placeholder="Enter your username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input 
                                required 
                                className="form-control" 
                                type="password" 
                                id="password" 
                                placeholder="Enter your password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                     
                        <button className="btn btn-success ms-2" style={{ width: "425px" }} type="submit">Log In</button>

                    {isAuthenticated?(
                       <button onClick={(e)=> logout()}>Logout</button>
                    ):(
                        <button 
                        type="button" // Prevent form submission
                        className="btn btn-primary ms-2" 
                        onClick={() => loginWithRedirect()}
                    >
                        Log In with Google
                    </button>
                    )}
                    </form>
                    {errorMessage && (
                        <div className="alert alert-danger mt-3">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
