import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Homepage.css';
import Posts from './Posts';
import Chatbot from './Chatbot';
import Navbar from '../Navbar';
import Footer from '../Footer';

// Import the image
import back1 from './back1.jpg';

function HomePage() {
    const location = useLocation();

    useEffect(() => {
        // Check if we're on the homepage
        if (location.pathname === '/') {
            // Apply the background image for homepage
            document.body.style.backgroundImage = `url(${back1})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundAttachment = 'fixed';
        } else {
            // Reset background image when navigating away from homepage
            document.body.style.backgroundImage = '';
        }

        // Clean up when component unmounts or route changes
        return () => {
            document.body.style.backgroundImage = '';
        };
    }, [location.pathname]); // Re-run the effect whenever the route changes

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <Posts />
            </div>
            <Chatbot />
            <Footer />
        </>
    );
}

export default HomePage;
