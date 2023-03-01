const nodemailer  = require('nodemailer');

const sendEmail = async (options)=>{
    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        secure:false,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD
        }
    })
   
    const mailOption ={
        from:"مديرية الشؤون الدينية و الأوقاف",
        to:options.email,
        subject:options.subject,
        text: options.message,
        html:options.html,
    }
    await transporter.sendMail(mailOption)
}
 module.exports = sendEmail