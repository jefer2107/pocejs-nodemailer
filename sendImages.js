const fs = require('fs')
const path = require('path')
const sendMail = require('./emailService')

const sendImages = (content,mailData,configData)=>{
    const newMailData = {
        data: null
    }

    const {images} = mailData.mail.body

    if(!images || images == [])  throw Error('image data not informed.')
    if(!content || content == '') throw Error('content data not informed.')
    if(!mailData || mailData == undefined) throw Error('mailData data not informed.')
    if(!configData || configData == undefined) throw Error('configData data not informed.')

    let fileImages
    const newFileImages = []
    const {mail} = mailData
    const imagesLength = images.length
    const checkForFilepath = (images)=>{
        const verifyFilepath = images.find(x=>x.filePath)
        if(verifyFilepath){
            return true
        }else{
            return false
        }
    }
    
    const hasFilepath = checkForFilepath(images)

    images.forEach(x=>{
        if(x.buffer){
            if(!hasFilepath){
                fileImages=[
                    {
                        filename: x.filename,
                        buffer: x.buffer
                    }
                ]

                const filterObjectsImages = fileImages.find(x=> x.filename)

                newFileImages.push(filterObjectsImages)

                const newImagesLength = newFileImages.length

                if(newImagesLength === imagesLength){
                    let bodyContent
                
                    bodyContent = {
                        content,
                        images: newFileImages
                    }
                                        
                    const bodyType = mail.body.bodyType
                                        
                    const data = {
                        ...mailData.mail,
                        body: {
                            bodyType,
                            bodyContent
                        }
                    }
            
                    newMailData.data = data
        
                    try {
                        sendMail.send({
                            configData,
                            mailData: newMailData.data
                        })
                                            
                    } catch (e) {
                        throw Error(`Send mail fail.${e.message}`)
                    }

                    return false

                }

            }else{

                fileImages=[
                    {
                        filename: x.filename,
                        buffer: x.buffer
                    }
                ]
                const filterObjectsImages = fileImages.find(x=> x.filename)
    
                newFileImages.push(filterObjectsImages)
            }

            
        }else{
            
            fs.readFile(path.join(__dirname,x.filePath),(erro,buffer)=>{
                if(erro){
                    fileImages=[]
                    //throw Error(`Images can´t be set. ${erro}`)
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
                                
                    const data = {
                        ...mailData.mail,
                        body: {
                            bodyType,
                            bodyContent
                        }
                    }
            
                    newMailData.data = data

                    try {
                        sendMail.send({
                            configData,
                            mailData: newMailData.data
                        })
                                    
                    } catch (e) {
                        throw Error(`Send mail fail.${e.message}`)
                    }
                }

                
            })
        }
        
    })

  return {
      newMailData
    }
}

module.exports = sendImages