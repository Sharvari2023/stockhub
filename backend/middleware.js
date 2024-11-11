
const ExError = require('./utils/ExError.js');

// Redirect Url Save Middleware ↓ (routes -> user.js)
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
};

