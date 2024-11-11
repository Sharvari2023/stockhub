const User = require("../model/user1.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

// Load environment variables from .env file
require("dotenv").config();

module.exports.renderSignupForm = (req, res) => {
    res.redirect("../frontend/src/landing_page/view/users/login");
};

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });

        // Register the new user
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);

        // Log in the user using passport after registration
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            console.log("User registered and logged in successfully");

            // Generate JWT token after successful login
            const token = jwt.sign(
                { userId: registerUser._id, username: registerUser.username },
                process.env.SECRET,  // Use your secret key from environment variables
                { expiresIn: "1h" }  // Token expiration time
            );

            // Send JWT token and user data to the frontend
            res.json({
                success: true,
                message: "User logged in successfully!",
                token,  // Send the token along with the success message
                user: registerUser,  // Send the user data
                redirect: "/"  // Redirect path after successful login
            });
        });
    } catch (e) {
        console.error("Registration failed:", e);
        res.json({
            success: false,
            message: e.message,  // Send error message to frontend
            redirect: "/signup"  // Redirect back to signup page in case of error
        });
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.redirect("../frontend/src/landing_page/view/users/login");
};

module.exports.login = async (req, res, next) => {
    passport.authenticate("local", { session: false }, async (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({
                success: false,
                message: "Invalid credentials",  // Send failure message if authentication fails
                redirect: "/login"
            });
        }

        // Generate JWT token after successful authentication
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.SECRET,  // Use your secret key from environment variables
            { expiresIn: "1h" }  // Token expiration time
        );

        // Send token, user data, and success message to the frontend
        res.json({
            success: true,
            message: "User registered successfully!",
            token,  // Send the JWT token to the frontend
            user,   // Send the user data
            redirect: "/"  // Redirect to the home page after successful login
        });
    })(req, res, next);  // Call passport.authenticate manually for login
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);  // Handle any error that occurs during logout
        }
        req.flash("success", "You are logged out.");
        res.redirect("/");  // Redirect to the home page after logout
    });
};
