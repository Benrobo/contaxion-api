const { SMTPClient } = require('emailjs');
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

const MAIL_USER = process.env.MAIL_USER;
const MAIL_PWD = process.env.MAIL_PWD;

function sendMail(req, res) {
    let { subject, to, from, username, message } = req.body;

    // console.log(req.body)
    const client = new SMTPClient({
        user: 'alumonabenaiah251@gmail.com',
        password: 'benrobo8',
        host: 'smtp.gmail.com',
        ssl: true,
    });

    let htmlMessage = `
    From: Contact form.
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins&family=Source+Sans+Pro&display=swap');
            body{
                font-family: 'Poppins', sans-serif;
            }
            blockquote{
                font-size: 15px;
                padding:10px;
                border-left: 4px solid #ccc;
                box-shadow: 0px 0px 6px #777;
                font-family: 'Poppins', sans-serif;
            }
        </style>
    </head>
    <body>
        <blockquote>
            <h3>New message from : ${username}</h3>
            <p> ${message}</p>
        
            <br />
            <span>Best wishes: <b>Contaxion</b></span>
        </blockquote>
    </body>
    </html>
`
    
    // send the message and get a callback with an error or details of the message that was sent
    let clientMessage = {
        from: `Contact Form: <username@${from}>`,
		to: `${to}`,
		cc: `else <else${to}>`,
		subject: `${subject}`,
        attachment: [
            { 
                data:htmlMessage , alternative: true 
            },
        ],
    }

    client.send(clientMessage,
        (err, message) => {
            console.log(err || message);
            res.json({message, err})
        }
    );
    // const transporter = nodemailer.createTransport(smtpTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: MAIL_USER,
    //         pass: MAIL_PWD
    //     }
    // }));

    // const mailOptions = {
    //     from: "Contaxion: " + from,
    //     to,
    //     subject,
        // html: `
        //     From: Contact form.
        //     <!DOCTYPE html>
        //     <html lang="en">
        //     <head>
        //         <style>
        //         @import url('https://fonts.googleapis.com/css2?family=Poppins&family=Source+Sans+Pro&display=swap');
        //             body{
        //                 font-family: 'Poppins', sans-serif;
        //             }
        //             blockquote{
        //                 font-size: 15px;
        //                 padding:10px;
        //                 border-left: 4px solid #ccc;
        //                 box-shadow: 0px 0px 6px #777;
        //                 font-family: 'Poppins', sans-serif;
        //             }
        //         </style>
        //     </head>
        //     <body>
        //         <blockquote>
        //             <h3>New message from : ${username}</h3>
        //             <p> ${message}</p>
                
        //             <br />
        //             <span>Best wishes: <b>Contaxion</b></span>
        //         </blockquote>
        //     </body>
        //     </html>
        // `
    // };

    // try {
    //     transporter.sendMail(mailOptions, function (error, info) {
    //         if (error) {
    //             console.log(error);
    //             res.status(500).json(error)
    //             return;
    //         } else {
    //             res.status(200).json({
    //                 msg: "Email sent",
    //                 info: info.response
    //             })
    //             console.log('Email sent: ' + info.response);
    //         }
    //     });
    // } catch (e) {
    //     res.status(500).json({ msg: e })
    // }
}


module.exports = sendMail