const { adminSdkKey } = require("../config/config");
const { getGeneralConf } = require("../database");


const clientSdk = function() {
    return async (req, res, next) => {
        const cloverSdkKey = req.header('clover-sdk-key'); 
     try {
         if(cloverSdkKey){
            await getGeneralConf().then((conf)=>{
                if(conf.client_sdk===cloverSdkKey){
                    next()
                }else{
                    res.status(401).json({"errors": "Invalid sdk key"})
                }
            }).catch(err=>{
                res.status(401).json({"errors": "Inavlid skd key"})
            })
         }else{
            res.status(400).json({"errors": "Clover SDK key is required"})
         }
     } catch (error) {
      next(error)
     }
}
}

const adminSdk = function() {
    return async (req, res, next) => {
        const cloverSdkKey = req.header('clover-sdk-key');        
         try {
             if(cloverSdkKey){
                await getGeneralConf().then(()=>{
                    if(adminSdkKey===cloverSdkKey){
                        next()
                    }else{
                        res.status(401).json({"errors": "Invalid sdk key"})
                    }
                }).catch(err=>{
                    res.status(401).json({"errors": "Inavlid skd key"})
                })
             }else{
                res.status(400).json({"errors": "Clover SDK key is required"})
             }
         } catch (error) {
          next(error)
         }
}
}

const allSdk = function() {
    return async (req, res, next) => {
        const cloverSdkKey = req.header('clover-sdk-key'); 
         try {
             if(cloverSdkKey){
                await getGeneralConf().then((conf)=>{
                    if(conf.client_sdk===cloverSdkKey||adminSdkKey===cloverSdkKey){
                        next()
                    }else{
                        res.status(401).json({"errors": "Invalid sdk key"})
                    }
                }).catch(err=>{
                    res.status(401).json({"errors": "Inavlid skd key"})
                })
             }else{
                res.status(400).json({"errors": "Clover SDK key is required"})
             }
         } catch (error) {
          next(error)
         }
    }
}


const sdk =  {
    client: clientSdk,
    admin: adminSdk,
    all: allSdk,
}


module.exports = sdk ;