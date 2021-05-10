const dotenv = require('dotenv');
dotenv.config();


module.exports =  {
    port: process.env.PORT,
    db:process.env.DB_NAME,
    mongoURI : process.env.MONGO_URI,
}