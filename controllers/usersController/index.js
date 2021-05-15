const User = require('../../models/Users');
const { getFromWhere, InsertOneToCollection, getFromWhereIntern } = require('../../database');
const passport = require('passport');



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


exports.register = async (req,res,next)=>{
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            res.status(400).json({ msg: "username already existe ok",data:user })
        } else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                token: "",
                created_at: ""
            });
            newUser.setPassword(req.body.password);
            newUser.save().then(User => res.json(User))
                .catch(err => {
                    res.json({ msg: "saving error: " + err });
                });
        }
    })
}