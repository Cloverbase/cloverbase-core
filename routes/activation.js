const Users = require("../models/Users")

const activation = function() {
    return async (req, res, next) => {
     try {
         if(req.body.user.email){
            await Users.findOne({email:req.body.user.email}).then((user)=>{
                if(user.active){
                    next()
                }else{
                    res.status(401).json({"errors": "Your acount it's not activated yet !"})
                }
            }).catch(err=>{
                res.status(401).json({"errors": "user is not existe try to register !"})
            })
         }else{
            res.status(400).json({"errors": "misssed feild"})
         }
     } catch (error) {
      next(error)
     }
    }
   }

module.exports = activation ;