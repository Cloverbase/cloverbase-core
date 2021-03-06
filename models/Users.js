const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
    },
    active:{
        type:Boolean,
        require:true,
        default:false,
    },
    verificationCode:{
        type:String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at:{
        type: Date,
        default: Date.now,
    }
});


UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
    console.log(this.salt);
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === hash;
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        role: this.role,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

UserSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};


/// create a new collectio in  mongo db called  user that's all
module.exports = User = mongoose.model('clover_users', UserSchema);