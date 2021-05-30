const dotenv = require('dotenv');
dotenv.config();


//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// created by : Abdellatif Ahammad
// 

module.exports =  {
    port: process.env.PORT,
    db:process.env.DB_NAME,
    mongoURI : process.env.MONGO_URI, 
    pagination : process.env.PAGINATION ,
    paginationSize : process.env.PAGINATION_SIZE,
    appURL  : process.env.APP_URL,
    mailHost : process.env.MAIL_HOST,
    mailPort  : process.env.MAIL_PORT,
    mailUser  :  process.env.MAIL_USERNAME,
    mailPassword  : process.env.MAIL_PASSWORD,

}