const sendMail = require("./emailService")
const ejsCompiler = require('./ejsCompiler')
const getImages = require("./getImages")

const ejsSendMail = (configData)=>{
    const send = (mailData)=>{        
        const {mail} = mailData
        
        if(!configData.smtp) throw Error('Config data not configured')
        if(!mailData) throw Error('Data wasn´n informed')
        if(!mail.from) throw Error('from should be set')
        if(!mail.to) throw Error('to should be set')
    
        let bodyContent
    
        if(mail.body && mail.body.bodyType) {
            const {bodyType} = mail.body
            const setImages = mail.body.images
    
            switch(bodyType){
                case 'text':
                    bodyContent = mail.body.content
                    break
                case 'html':
                    if(setImages){
                        let content = mail.body.content
                        if(mail.body.images[0].buffer){
                            const images = getImages(setImages,content,mailData,configData)
                
                            bodyContent = {
                                content,
                                images
                            }
                            
                        }else{
                            getImages(setImages,content,mailData,configData)
                            return false
                        }
                    }else{
                        bodyContent = {
                            content: mail.body.content
                        }
                    } 
                    break
                case 'ejs':
                    const getEjsCompiler = ejsCompiler(mail.body.content,mail.body?.ejsModel)

                    if(setImages){
                        if(mail.body.images[0].buffer){
                            const images = getImages(setImages, getEjsCompiler,mailData,configData)
            
                            bodyContent = {
                                content: getEjsCompiler,
                                images
                            }
                        }else{
                            getImages(setImages, getEjsCompiler,mailData,configData)
                            return false
                        }

                    }else{
                        bodyContent = {
                            content: getEjsCompiler,
                        }
                        
                    }
                    break
                default:
                    throw Error('BodyType setted not exists')
            }
        }

        const sendBodyType = mail.body.bodyType

        const newMailData = {
            ...mailData.mail,
            body: {
                bodyType: sendBodyType,
                bodyContent
            }
        }

        try {
            sendMail.send({
                configData,
                sendMailData: newMailData
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