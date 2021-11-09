const fs = require('fs')
const path = require('path')
const sendMail = require('./emailService')

const getImages = (setImages,content,mailData,configData)=>{
    const buffer = setImages[0].buffer
    let imageFields = []
    let imageConfig = []

    const {mail} = mailData

    if(buffer){
        imageConfig =  setImages.map(x=>{
            return {
                filename: x.filename,
                buffer: x.buffer,
            }
        })

    }else{
        const imageLength = setImages.length
        setImages.map(x=>{
            return (
                fs.readFile(path.join(__dirname,x.filePath),(erro,buffer)=>{
                    console.log('x.filePath: ', x.filePath)
                    if(erro)
                    {
                        imageConfig = []
                        throw Error(`Image can´t be set. ${erro}`)
            
                    }else{
                        imageFields = [
                            {
                                filename: x.filename,
                                content: buffer,
                                cid: x.cid
                            }
                        ]

                        const filteredObjects = imageFields.find(x=> x.filename)
                        imageConfig.push(filteredObjects)

                        const imageConfigLength = imageConfig.length

                        if(imageConfigLength == imageLength ){
                            let bodyContent
        
                            bodyContent = {
                                content,
                                images: imageConfig
                            }
                            
                            const newBodyType = mail.body.bodyType
                            
                            const newMailData = {
                                ...mailData.mail,
                                body: {
                                    bodyType: newBodyType,
                                    bodyContent: bodyContent
                                }
                            }

                            console.log('newMailData: ', newMailData.body.bodyContent)

                            try {
                                sendMail.send({
                                    configData,
                                    sendMailData: newMailData
                                })
                                
                            } catch (e) {
                                throw Error(`Send mail fail.${e.message}`)
                            }
                        }else{
                            return false
                        }
                        
                    }
                    
                })
            )
        })

    }

  return imageConfig   
}

module.exports = getImages