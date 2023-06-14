// import nodemailer
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     service: "hotmail",
//     auth: {
//         user: process.env.EMAIL_VERIFICATION_ADDRESS,
//         pass: process.env.EMAIL_VERIFICATION_PASSWORD,
//     }
// });

// export default async function send_email({ email, subject, text, html }) {
//     // // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: process.env.EMAIL_VERIFICATION_ADDRESS, // sender address
//         to: email, // list of receivers
//         subject: subject, // Subject line
//         text: text, // plain text body
//         html: html, // html body
//     });

//     return true;
// }

////////////////////
///////////////////////
////////////////////

const nodemailer = require("nodemailer");
import { welcomeEmail } from "./emails.js";

export default async function send_email(user_email, email) {
  console.log("Sending email to " + user_email);
  console.log("sending from " + process.env.SCAVENGER_GMAIL_ADDRESS);
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.SCAVENGER_GMAIL_ADDRESS,
      pass: process.env.SCAVENGER_GMAIL_PASSWORD,
    },
    secure: true,
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });
  console.log("transporter verified");

  let mailData = await {
    from: process.env.SCAVENGER_GMAIL_ADDRESS,
    to: user_email,
    subject: email.subject,
    text: email.text,
    html: email.html,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        console.log("Email sent: " + info.response);
        resolve(info);
      }
    });
  });
}