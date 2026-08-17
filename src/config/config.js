const dotenv = require("dotenv");

dotenv.config();

const config = {//عشان نجمع كل إعدادات المشروع في object واحد.
    port: process.env.PORT || 3000,
    // وprocess.env بيحتوي على Environment Variables.

    database: {
        uri: process.env.MONGO_URI,
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
};

module.exports = config;