const nodemailer = require('nodemailer');
    
function mailer(mail){
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: "iitp.entrepreneurship@gmail.com",
          pass: "gwvxpkcxhaftgbdv"
        }
      });
    
      message = {
        from: "iitp.entrepreneurship@gmail.com",
        to: mail.email,
        subject: "StartIn Ecell Registration",
        text: `You are registered successfully 
Username : ${mail.username}
Password :  ${mail.password}`
    }
    transporter.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    }
    )
}

module.exports = {mailer}
    