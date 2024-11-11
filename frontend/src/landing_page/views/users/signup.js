import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import equinexLogo from './logo.png'; // Ensure this path is correct

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleRegister } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await handleRegister(username, email, password);

            if (response) {
                navigate('/'); // Redirect to home page after successful signup
            } else {
                console.error('Registration failed', response.message);
            }
        } catch (error) {
            console.error('Error occurred during registration:', error);
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

            {/* Right Side: Sign Up Form */}
            <div className="col-md-6 d-flex justify-content-center align-items-center">
                <div className="card shadow-sm p-4" style={{ maxWidth: '500px', width: '90%' }}>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="username">Username</label>
                            <input 
                                required
                                className="form-control" 
                                type="text" 
                                id="username" 
                                placeholder="Enter your name" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">E-mail</label>
                            <input 
                                required 
                                className="form-control" 
                                type="email" 
                                id="email" 
                                placeholder="Enter your email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
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
                        <button className="btn btn-primary w-100 mb-2" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
