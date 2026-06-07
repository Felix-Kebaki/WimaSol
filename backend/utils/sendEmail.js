const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure:true,
    host:`smtp.gmail.com`,
    port:465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    });
};

const adminAlert=async(from,subject,html)=>{
    await transporter.sendMail({
        from,
        to:process.env.EMAIL_USER,
        subject,
        html
    })
}

module.exports = {sendEmail,adminAlert};