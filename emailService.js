const nodemailer = require('nodemailer')
const getMailOptions = require('./getMailOptions')

const send = ({configData,mailData})=>{
    if(!configData) throw Error(`SMTP config not configured. Please, configure calling 'config' funtion`)
    if(!mailData) throw Error(`Email data not exists. Please, set emai data as parameter`)

    const {smtp} = configData

    const transporter = nodemailer.createTransport({ 
        host:smtp.host,
        secure:smtp.secure,
        port:smtp.port,
        auth: {
            user:smtp.user,
            pass:smtp.password
        }
    })

    const {bodyType} = mailData.body

    const mailOptions = getMailOptions(mailData, bodyType)

    transporter.sendMail(mailOptions,(error)=>{
        if(error)
        {
            throw Error(error.message)
            
        }
        else
        {
            console.log('Email enviado com sucesso!')
        }
    })
}

const sendMailService = {
    send
}

module.exports = sendMailService