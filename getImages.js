const fs = require('fs')
const path = require('path')
const sendMail = require('./emailService')

const getImages = (setImages, ejsCompiler,mailData,configData)=>{

    const filename = setImages[0].filename
    const filePath = setImages[0].filePath
    const cid = setImages[0].cid
    const buffer = setImages[0].buffer
    const {mail} = mailData

    let imageConfig

    if(buffer){
        imageConfig = [
            {
                filename,
                content: new Buffer(buffer),
            }
        ]

    }else{
        fs.readFile(path.join(__dirname,filePath),(erro,buffer)=>{
            if(erro)
            {
                imageConfig = []
                throw Error(`Image can´t be set. ${erro}`)
    
            }else{
                imageConfig = [
                    {
                        filename,
                        content: buffer,
                        cid
                    }
                ]

                let bodyContent

                bodyContent = {
                    ejsCompiler,
                    images: imageConfig
                }

                const sendBodyType = mail.body.bodyType

                const newMailData = {
                    ...mailData.mail,
                    body: {
                        bodyType: sendBodyType,
                        bodyContent: bodyContent
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
    
        })
    }

  return imageConfig   
}

module.exports = getImages