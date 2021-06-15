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
    appName:  process.env.APP_NAME,
    adminEmail : process.env.ADMIN_EMAIL,
    adminPassword :process.env.ADMIN_PASSWORD,
    adminSdkKey: process.env.ADMIN_SDK,
    readRules: process.env.READ_RULE,
    writeRules: process.env.WRITE_RULE,
    storageRules: process.env.STORAGE_RULE,
}