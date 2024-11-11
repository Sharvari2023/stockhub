import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import HomePage from './landing_page/home/HomePage';
import Main from './landing_page/Dashboard/Main';
import Holdings from './landing_page/Dashboard/Holdings';
import Positions from './landing_page/Dashboard/Positions';
import Orders from './landing_page/Dashboard/Orders';
import WatchList from './landing_page/Dashboard/WatchList';
import ProfilePage from './landing_page/profile/profile';
import Authentication from './landing_page/pages/authentication';
import { AuthProvider } from './landing_page/contexts/AuthContext';
import About from './landing_page/about/About';
import Login from './landing_page/views/users/login.js';
import Signup from './landing_page/views/users/signup.js';
import Logout from './landing_page/views/users/logout.js';
import News from './landing_page/News.js'
import Chat from './landing_page/Chat.js'
// import App from './App'; // Import your App component if it's defined separately

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-nckpqc670iaq2y81.us.auth0.com"
      clientId="jeUP5mdzX0uDhyhfiK7CaauvKvzhuY9o"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >

      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/news" element={<News />} />
            <Route path="/dashboard/*" element={<Main />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </AuthProvider>
      </Router>

    </Auth0Provider>
  </React.StrictMode>
);
