const User = require('../../models/Users');
const { getFromWhere, InsertOneToCollection, getFromWhereIntern, updateReads, updateRequests, updateWrites } = require('../../database');
const passport = require('passport');
const { generateCode } = require('../../helpers/codeGenerator');
const { sendEmail } = require('../../services/mails');
const { appName } = require('../../config/config');



//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// created by : Abdellatif Ahammad
// 


exports.login = async (req,res,next)=>{
    await updateReads();
    await updateRequests();
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
    await updateReads();
    await updateWrites();
    await updateRequests();
    const { body: { user } } = req;
    if(user){
    if(user.email&&user.code&&user.password){
    User.findOne({ email: user.email })
    .then(client => {
        if (client.active) {
            return res.status(200).json({"msg":"Your account already Activated"})
        }else{
            if(client.verificationCode == user.code){
                const code = generateCode(16);
                User.findOneAndUpdate({email : user.email } , {active:true,verificationCode:code}).then(async (result)=>{
                    try{
                        await sendEmail({from: appName,
                        to: user.email,
                        subject: 'Welcome to '+ appName,
                        // html: '<b>This is bold text</b>',
                        text: 'Welcome to '+ appName},'welcome/welcome',{app_name:appName,header_img:"https://cdn.pixabay.com/photo/2021/02/04/20/04/tea-5982485_960_720.jpg",title:"Welcome to  Clover Podcast",text:"Our teem want to say tank you fro join Us , We hoope that we can help you to listen to your favorite Podcasts/Books in a best way"}).then((result,err)=>{
                                if(result){
                                    console.log("email sent");
                                }else{
                                    console.log("something not good");
                                }
                        })
                        } catch  (err) { 
                            console.log(err);
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
    await updateReads();
    await updateWrites();
    await updateRequests();
    if(req.body.email){
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
                    await sendEmail({from: appName,
                    to: req.body.email,
                    subject: 'Verification code for '+ appName,
                    // html: '<b>This is bold text</b>',
                    text: 'Verification code   '},'auth/register',{app_logo:"https://image.flaticon.com/icons/png/512/4729/4729674.png",app_name:appName, email:req.body.email,verification_code:code}).then((result,err)=>{
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
    }).catch(err=>{
        res.status(422).json({"errors":"user doesn't existe"})
    })
    }else{
        res.status(422).json({"errors":"email required"})
    }
}

exports.forgetPassword = async (req,res,next)=>{
    await updateReads();
    await updateWrites();
    await updateRequests();
    if(req.body.email) {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            const code  = generateCode(10);
            User.findOneAndUpdate({email:req.body.email},{ updated_at: Date.now(),verificationCode:code }).then(async (result)=>{
                try{
                    await sendEmail({from: appName,
                    to: req.body.email ,
                    subject: 'Reset Password Code!',
                    // html: '<b>This is bold text</b>',
                    text: 'Verification code  '},'auth/reset_password',{app_logo:"https://image.flaticon.com/icons/png/512/4729/4729674.png",name:"abdellatif",verification_code:code,app_name:'Cloverbase'}).then((result,err)=>{
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


exports.resetPassword  = async (req,res,next)=>{
    await updateReads();
    await updateWrites();
    await updateRequests();
    const { body: { user } } = req;
    if(req.body.user){
        if(req.body.user.email&&req.body.user.password&&req.body.user.code){
            User.findOne({ email: req.body.user.email }).then(user=>{
                if(user.verificationCode === req.body.user.code){
                    const newUser = User({
                        password: req.body.user.password,
                        updated_at: Date.now()
                    });
                    const code = generateCode(16);
                    newUser.setPassword(req.body.user.password);
                    User.findOneAndUpdate({email:req.body.user.email},{password:newUser.password,salt:newUser.salt,updated_at:Date.now(),verificationCode:code}).then(result=>{
                        // res.status(200).json({"user":newUser});
                        // :TODO :make every thing done and ok .
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
                    res.status(400).json({ msg: "code is not exact !"})
                }
            })
        } else {
            res.status(400).json({errors: "email,new Password, and code are required"})
        }
    }else{
        res.status(400).json({errors: "email,new Password, and code are required"})
    }
}

exports.changePassword = async (req,res,next)=>{
    await updateReads();
    await updateWrites();
    await updateRequests();
    const { body: { user } } = req;
    if(req.body.user){
        if(req.body.user.email&&req.body.user.password&&req.body.user.oldPassword){
            User.findOne({ email: req.body.user.email }).then(user=>{
                    const newUser = User({
                        password: user.password,
                        salt:user.salt,
                        updated_at: Date.now()
                    });
                    const code = generateCode(16);
                    if(newUser.validatePassword(req.body.user.oldPassword)){
                        newUser.setPassword(req.body.user.password);
                        User.findOneAndUpdate({email:req.body.user.email},{password:newUser.password,salt:newUser.salt,updated_at:Date.now(),verificationCode:code}).then(result=>{
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
                        return res.status(422).json({"errors":"password not true"});
                    }
            }).catch(err=>{
                return res.status(404).json({"errors":"user doesn't existe !"})
            })
        } else {
            res.status(400).json({errors: "email,new Password, and code are required"})
        }
    }else{
        res.status(400).json({errors: "email,Old password ,new Password are required"})
    }
}