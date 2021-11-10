
const getMailOptions = (mailData, bodyType)=>{
    let mailOptions = {}
    const {images} = mailData.body.bodyContent

    switch(bodyType){
        case 'text':
            mailOptions = {
                from: mailData.from,
                to: mailData.to,
                subject: mailData.subject,
                text: mailData.body.bodyContent
            }
            break
        case 'html':
        case 'ejs':
            mailOptions = {
                from: mailData.from,
                to: mailData.to,
                subject: mailData.subject,
                attachments:images,
                html: mailData.body.bodyContent.content
            }
            break
    }

    return mailOptions
}

module.exports = getMailOptions