const jwt = require('jsonwebtoken');

module.exports.isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user; // Populate `req.user` with decoded info (e.g., username)
        next();
      });
    } else {
      return res.status(401).json({ message: "Authorization header not found" });
    }
  };
  