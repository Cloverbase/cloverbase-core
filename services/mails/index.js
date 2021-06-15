var nodemailer = require('nodemailer');
const Promise = require('bluebird');
const { mailHost, mailPort, mailUser, mailPassword } = require('../../config/config');
const  path  = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');
const { getFrom } = require('../../database');


exports.sendEmail = async function (options,template,context) {
    if(!options){
        throw new Error("Options can not be null");
    }

    var transporter = nodemailer.createTransport({
        host: mailHost || options.host || 'smtp.office365.com', // Office 365 server
        port:mailPort || options.port || 587,     // secure SMTP
        secure:options.secure || false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {user:mailUser,pass:mailPassword},
        tls: options.tls || {ciphers: 'SSLv3'}
    });

     const response =    transporter.sendMail({
            from: options.from || "cloverbase",
            replyTo: options.replyTo,
            to: options.to,
            subject: options.subject,
            cc:options.cc,
            bcc:options.bcc,
            text:options.text,
            html:template?loadTemplate(template,context):"",
            attachments:options.attachments,
        });

    return response;
}

function loadTemplate (templateName,context) {
    // Open template file
    var source = fs.readFileSync(path.join(__dirname,'templates', `${templateName}.hbs`), 'utf8');
    // Create email generator
    var template = Handlebars.compile(source);
    return template(context)
}
