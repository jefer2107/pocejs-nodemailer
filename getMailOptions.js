
const getMailOptions = (sendMailData, bodyType)=>{
    let mailOptions = {}

    switch(bodyType){
        case 'text':
            mailOptions = {
                from: sendMailData.from,
                to: sendMailData.to,
                subject: sendMailData.subject,
                text: sendMailData.body.bodyContent
            }
            break
        case 'ejs':
            const {images} = sendMailData.body.bodyContent
            mailOptions = {
                from: sendMailData.from,
                to: sendMailData.to,
                subject: sendMailData.subject,
                attachments:images,
                html: sendMailData.body.bodyContent
            }
            break
    }

    return mailOptions
}

module.exports = getMailOptions