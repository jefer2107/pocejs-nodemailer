const sendMail = require("./emailService")
const ejsCompiler = require('./ejsCompiler')
const sendImages = require("./sendImages")

const ejsSendMail = (configData)=>{
    const send = (mailData)=>{        
        
        if(!configData) throw Error('Config data not configured')
        if(!mailData) throw Error('mailData wasn´n informed')
        if(!mailData.mail.from ) throw Error('from should be set')
        if(!mailData.mail.to ) throw Error('to should be set')
    
        const {mail} = mailData
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


module.exports = ejsSendMail