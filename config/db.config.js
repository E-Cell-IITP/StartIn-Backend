const dotenv = require('dotenv');
dotenv.config();

module.exports={
    db: process.env.MONGODB_URI
}