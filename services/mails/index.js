var nodemailer = require('nodemailer');
const { mailHost, mailPort, mailUser, mailPassword } = require('../../config/config');

exports.sendEmail = async function (options) {
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

  const response = await   transporter.sendMail({
        from: options.from,
        replyTo: options.replyTo,
        to: options.to,
        subject: options.subject,
        cc:options.cc,
        bcc:options.bcc,
        text:options.text,
        html:options.html,
        attachments:options.attachments,
    });

    return response;
}