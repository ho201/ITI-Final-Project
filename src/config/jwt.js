const jwt = require("jsonwebtoken");
const config = require("./config");

const generateToken = (payload) => {//دي function مسؤولة عن إنشاء JWT Token.
    return jwt.sign(payload, config.jwt.secret, {expiresIn: config.jwt.expiresIn,}
        // Header.Payload.Signature
    );
};

const verifyToken = (token) => {//تتأكد إن الـ Token صحيح.
    return jwt.verify(token, config.jwt.secret);//خد الـ Token ده، واتأكد منه باستخدام نفس الـ Secret.
};

module.exports = {
    generateToken,
    verifyToken,
};