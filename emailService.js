const nodemailer = require('nodemailer')
const getMailOptions = require('./getMailOptions')

const send = ({configData,mailData})=>{
    if(!configData.smtp) throw Error(`SMTP config not configured. Please, configure calling 'config' funtion`)
    if(!mailData) throw Error(`Email data not exists. Please, set emai data as parameter`)

    const transporter = nodemailer.createTransport({ 
        host:configData.host,
        secure:configData.secure,
        auth: {
            user:configData.user,
            pass:configData.password
        }
    })

    const {bodyType} = mailData.body

    const mailOptions = getMailOptions(mailData, bodyType)

    transporter.sendMail(mailOptions,(error)=>{
        if(error)
        {
            throw Error(error)
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