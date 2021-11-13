const fs = require('fs')
const path = require('path')
const sendMail = require('./emailService')

const sendImages = (images,content,mailData,configData)=>{
    let fileImages
    const newFileImages = []
    const {mail} = mailData
    const imagesLength = images.length
    const checkForFilepath = (images)=>{
        const isFilepath = images.find(x=>x.filePath)
        if(isFilepath){
            return true
        }else{
            return false
        }
    }
    
    const hasFilepath = checkForFilepath(images)

    images.forEach(x=>{
        if(x.buffer){
            if(hasFilepath == false){
                images.forEach(x=>{
                    fileImages=[
                        {
                            filename: x.filename,
                            buffer: x.buffer
                        }
                    ]

                    const filterObjectsImages = fileImages.find(x=> x.filename)

                    newFileImages.push(filterObjectsImages)

                })

                const newImagesLength = newFileImages.length

                if(newImagesLength === imagesLength){
                    let bodyContent
                
                    bodyContent = {
                        content,
                        images: newFileImages
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

            }

            fileImages=[
                {
                    filename: x.filename,
                    buffer: x.buffer
                }
            ]
            const filterObjectsImages = fileImages.find(x=> x.filename)

            newFileImages.push(filterObjectsImages)
            
        }else{
            
            fs.readFile(path.join(__dirname,x.filePath),(erro,buffer)=>{
                if(erro){
                    fileImages=[]
                    throw Error(`Image can´t be set. ${erro}`)
                }else{
                    fileImages=[
                                    {
                                        filename: x.filename,
                                        content: buffer,
                                        cid: x.cid
                                    }
                                ]

                    const filterObjectsImages = fileImages.find(x=>x.filename)
                    newFileImages.push(filterObjectsImages)
        
                }

                const newImagesLength = newFileImages.length

                if(imagesLength == newImagesLength){

                    let bodyContent
            
                    bodyContent = {
                        content,
                        images: newFileImages
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

                
            })
        }
        
    })

  
}

module.exports = sendImages