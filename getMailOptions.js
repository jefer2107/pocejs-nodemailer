
const getMailOptions = (mailData, bodyType)=>{
    if(mailData == null || mailData == undefined) throw Error('maildata not informed.')
    if(mailData.to == null || mailData.to == '') throw Error('to not informed.')
    if(mailData.from == null || mailData.from == '') throw Error('from not informed.')
    if(bodyType == null || bodyType == '') throw Error('bodyType not informed.')

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

    return {
        mailOptions
    }

}

module.exports = getMailOptions