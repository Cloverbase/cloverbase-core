const User = require('../../models/Users');
const { getFromWhere, InsertOneToCollection, getFromWhereIntern } = require('../../database');
const passport = require('passport');
const { generateCode } = require('../../helpers/codeGenerator');
const { sendEmail } = require('../../services/mails');



//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// created by : Abdellatif Ahammad
// 


exports.login = async (req,res,next)=>{
    const { body: { user } } = req;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }
        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
            return res.json({ user: user.toAuthJSON() });
        }
        return res.status(400).json(info);
    })(req, res, next);
}

exports.activate = async (req,res,next) => {
    const { body: { user } } = req;
    if(user){
    if(user.email&&user.code&&user.password){
    User.findOne({ email: user.email })
    .then(client => {
        if (client.active) {
            return res.status(200).json({"msg":"Your account already Activated"})
        }else{
            if(client.verificationCode == user.code){
                User.findOneAndUpdate({email : user.email } , {active:true}).then(result=>{
                    
                    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
                        if (err) {
                            return next(err);
                        }
                        if (passportUser) {
                            const user = passportUser;
                            user.token = passportUser.generateJWT();
                            return res.json({ user: user.toAuthJSON() });
                        }
                        return res.status(400).json(info);
                    })(req, res, next);
                })
            }else{
                res.status(400).json({"errors":'Code is not true'})
            }
        }
    }).catch(err=>{
        res.status(500).json({"errors":"User doesn't existe !"})
    })
    }
    else{
    res.status(422).json({errors: "email,password,code are required" })
    }
    }else{
        res.status(400).json({errors: "email,password,code are required"})
    }
}



exports.register = async (req,res,next)=>{
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            res.status(400).json({ msg: "user already existe !"})
        } else {
            const code  = generateCode(10);
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                role: "basic",
                verificationCode:code,
                created_at: Date.now()
            });
            newUser.setPassword(req.body.password);
            newUser.save().then(async (User) => {
                try{
                    await sendEmail({from: 'e-ahammad.a@ucd.ma',
                    to: 'abdellatif.ahammad@gmail.com',
                    subject: 'Hi plaese can you Verify your account !',
                    // html: '<b>This is bold text</b>',
                    text: 'Verification code  : ' + code}).then((result,err)=>{
                            if(result){
                                res.status(200);
                                return res.json({"code_status":200,"msg":"please verify your email "+ req.body.email})
                            }else{
                                res.status(500)
                                return res.json({"code_status":500,"msg":'registeration mail failed to sent'})
                            }
                    })
                    } catch  (err) { 
                        console.log(err);
                    }
            })
                .catch(err => {
                    res.json({ msg: "saving error: " + err });
                });
        }
    })
}

exports.resetPassword = async (req,res,next)=>{
    if(req.body.email) {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            const code  = generateCode(10);
            User.findOneAndUpdate({email:req.body.email},{ updated_at: Date.now(),verificationCode:code }).then(async (result)=>{
                try{
                    await sendEmail({from: 'e-ahammad.a@ucd.ma',
                    to: 'abdellatif.ahammad@gmail.com',
                    subject: 'Hi plaese can you Verify your account !',
                    // html: '<b>This is bold text</b>',
                    text: 'Verification code  : ' + code}).then((result,err)=>{
                            if(result){
                                res.status(200);
                                res.status(200).json({"msg":"Please verify your email to get confirmation code"})
                            }else{
                                res.status(500)
                                return res.json({"code_status":500,"msg":'registeration mail failed to sent'})
                            }
                    })
                    } catch  (err) {
                        console.log(err);
                    }
            })
        } else {
            res.status(400).json({ msg: "user not existe !"})
        }
    })
}else{
    res.status(400).json({errors: "email,password are required"})
}
}


// MQvJJNp9Yf
exports.forgetPassword  = async (req,res,next)=>{
    const { body: { user } } = req;
    if(req.body.user){
        if(req.body.user.email&&req.body.user.newPassword&&req.body.user.code){
            User.findOne({ email: req.body.user.email }).then(user=>{
                if(user.verificationCode === req.body.user.code){
                    const newUser = User({
                        password: req.body.user.newPassword,
                        updated_at: Date.now()
                    });
                    newUser.setPassword(req.body.user.newPassword);
                    User.findOneAndUpdate({email:req.body.user.email},{password:newUser.password,salt:newUser.salt,updated_at:Date.now()}).then(result=>{
                        // res.status(200).json({"user":newUser});
                        // :TODO :make every thing done and ok .
                    })
                }else{

                }
            })
        } else {

        }
    }else{

    }
}