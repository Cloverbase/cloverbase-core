const { getDbRules } = require("./index");
const { appName, adminEmail, adminPassword } = require("../config/config");
const { generateSdkKey } = require("../helpers/codeGenerator");


module.exports ={
    colver_collections : ['clover_general_conf','clover_indexs','clover_data_rules','clover_email_conf',"clover_users","clover_storage","clover_statistics"],
    migration_data:{
    clover_general_conf:{"app_name":appName,app_logo_url:"",client_sdk:generateSdkKey()},
    clover_indexs:{},
    clover_data_rules:{"read":"admin","write":"admin","storage":"admin"},
    clover_email_conf:{
        "welcome":
            {
            "subject":"welcome to" + appName,
            "title":"welcome to" + appName,
            "message":"Our teem want to say tank you fro join Us , We hoope that we can help you to listen to your favorite Podcasts/Books in a best way",
            "header_img":"https://cdn.pixabay.com/photo/2021/02/04/20/04/tea-5982485_960_720.jpg"
            },
        "reset":{
            "subject":"Reset Password Code!",
            "title":"You have requested to reset your password",
            "message":"We cannot simply send you your old password. A unique Code to reset your password has been generated for you. To reset your password, Insert this code ."
        },
        "verification":{
            "subject":"Verification code ",
            "title":"Your Acount is created successfully you just need to active it now !",
            "message":" copy the code bellow and complete your registration steps !"
        }
    },
    clover_storage:{},
    clover_statistics:{ 
        "read":0,
        "write":0,
        "total":0,
    }
    },
    clover_users:{
        "email":adminEmail,
        "password":adminPassword,
        "active":true,
        "role":"admin"
    },
} 