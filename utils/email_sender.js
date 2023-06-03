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

export default async function send_email(user_email, email) {

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: "scavengerai@gmail.com",
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

    let mailData = await {
        from: 'scavengerai@gmail.com',
        to: user_email,
        subject: `ScavengerAI Email Verification`,
        text: email_text,
    }

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        })
    })
}