const sendMail = require("./emailService")
const ejsCompiler = require('./ejsCompiler')
const sendImages = require("./sendImages")

const sendMailConfig = (configData)=>{
    const send = (mailData)=>{        
        const {mail} = mailData
        
        if(!configData.smtp) throw Error('Config data not configured')
        if(!mailData) throw Error('Data wasn´n informed')
        if(!mail.from) throw Error('from should be set')
        if(!mail.to) throw Error('to should be set')
    
        let bodyContent
    
        if(mail.body && mail.body.bodyType) {
            const {bodyType} = mail.body
            const images = mail.body.images
    
            switch(bodyType){
                case 'text':
                    bodyContent = mail.body.content
                    break
                case 'html':
                    if(images){
                            let content = mail.body.content
                            sendImages(images,content,mailData,configData)
                            return false
                            
                        }
                    bodyContent = {
                        content: mail.body.content
                    }
                    break
                case 'ejs':
                    const ejsCompiled = ejsCompiler(mail.body.content,mail.body?.ejsModel)

                    if(images){
                            sendImages(images,ejsCompiled,mailData,configData)
                            return false
                        }

                    bodyContent = {
                            content: ejsCompiled,
                        }
                    break
                default:
                    throw Error('BodyType setted not exists')
            }
        }

        const bodyType = mail.body.bodyType

        const newMailData = {
            ...mailData.mail,
            body: {
                bodyType,
                bodyContent
            }
        }

        try {
            sendMail.send({
                configData,
                mailData: newMailData
            })
            
        } catch (e) {
            throw Error(`Send mail fail.${e.message}`)
        }
    }

    return{
        send 
    }
}


module.exports = sendMailConfig