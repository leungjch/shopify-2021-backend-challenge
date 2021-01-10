const dotenv = require('dotenv');

// Get env variables
dotenv.config();

module.exports = {
    S3_ACCESS_ID : process.env.S3_ACCESS_ID,
    S3_SECRET_ACCESS_KEY : process.env.S3_SECRET_KEY
};