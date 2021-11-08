
const getMailOptions = (sendMailData, bodyType)=>{
    let mailOptions = {}
    const {images} = sendMailData.body.bodyContent

    switch(bodyType){
        case 'text':
            mailOptions = {
                from: sendMailData.from,
                to: sendMailData.to,
                subject: sendMailData.subject,
                attachments:images,
                text: sendMailData.body.bodyContent
            }
            break
        case 'html':
        case 'ejs':
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