const jwt = require("jsonwebtoken");

function auth(req, res, next) {

    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    const token = header.split(" ")[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);

        next();

    } catch (err) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = auth;