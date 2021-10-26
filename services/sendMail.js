const nodemailer = require("nodemailer");

const MAIL_USER = process.env.MAIL_USER;
const MAIL_PWD = process.env.MAIL_PWD;

async function sendMail(req, res) {
    let { to, from, username, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            user: MAIL_USER,
            pass: MAIL_PWD
        }
    });

    const mailOptions = {
        from: "Contaxion: " + from,
        to: to,
        subject: 'Contact Form Feedback',
        html: `
            From: Contact form.
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <style>
                    blockquote{
                        font-size: 15px;
                        padding:10px;
                        border-left: 4px solid #ccc;
                    }
                </style>
            </head>
            <body>
                <h3>New message from : ${username}</h3>
                <blockquote>
                    <p> ${message}</p>
                </blockquote>

                <p>Best wishes</p>
                <p><b>Contaxion</b></p>
            </body>
            </html>
        `
    };

    try {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json(error)
                return;
            } else {
                res.status(200).json({
                    msg: "Email sent",
                    info: info.response
                })
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (e) {
        res.status(500).json({ msg: e })
    }
}


module.exports = sendMail