import {createTransport } from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()




export const mailer = (subject:string, text:string, to:string) => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PW
    }
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'AVDS SCE - ' + subject,
    text
  };

  transporter.sendMail(mailOptions, function(e, info){
    if (e) {
      console.log(e);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

