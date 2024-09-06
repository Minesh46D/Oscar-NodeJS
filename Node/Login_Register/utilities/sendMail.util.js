import nodeMailer from 'nodemailer'
import 'dotenv/config'

export const sendMail = async ( to = "minesh46patel@gmail.com", message = null ) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'minesh24patel@gmail.com',
            pass: process.env.APP_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: 'Minesh',
        to: 'minesh46patel@gmail.com',
        subject: 'Nodemailer testing',
        text: message || 'something'
    }

    return await transporter.sendMail(mailOptions)
    
} 