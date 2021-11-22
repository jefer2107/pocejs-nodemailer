const { assert } = require("chai")
const sendImages = require('../sendImages')

describe('sendImages',()=>{
    it('should be pass the data correctly',()=>{
        const configData = {
            smtp:{
                host: 'smtp://192.3943.33:8000',
                user: 'aaaa',
                password: '123',
                secure: true
            }  
        }

        const sendMailData = {
            mail:{
                to: 'dsfsdf@dsfsdf.com',
                from: 'sdfsdf@fdsf.com',
                subject: 'assunto xxx',
                body: {
                    bodyType: 'ejs',
                    content: 'ejs ejs xxx',
                    images: [
                        {
                            filename: 'imageTest 1',
                            buffer: 'buffer test 1'
                        },
                        {
                            filename: 'imageTest 2',
                            buffer: 'buffer test 2'
                        }
                    ]                  
                }
            }
            
        }

        const {mail} = sendMailData
        const images = mail.body.images
        let content = mail.body.content

        sendImages(content,sendMailData,configData)

        assert.isTrue(images != null || images != undefined)
        assert.isTrue(content != null || content != undefined)
        assert.isTrue(sendMailData != null || sendMailData != undefined)
        assert.isTrue(configData != null || configData != undefined)
    })

    it('images should be returned correctly',()=>{
        const configData = {
            smtp:{
                host: 'smtp://192.3943.33:8000',
                user: 'aaaa',
                password: '123',
                secure: true
            }  
        }

        const sendMailData = {
            mail:{
                to: 'dsfsdf@dsfsdf.com',
                from: 'sdfsdf@fdsf.com',
                subject: 'assunto xxx',
                body: {
                    bodyType: 'ejs',
                    content: 'ejs ejs xxx',
                    images: [
                        {
                            filename: 'imageTest 1',
                            buffer: 'buffer test 1'
                        },
                        {
                            filename: 'imageTest 2',
                            buffer: 'buffer test 2'
                        }
                    ]                  
                }
            }
            
        }

        const {mail} = sendMailData
        const images = mail.body.images
        let content = mail.body.content

        const newMailData = sendImages(content,sendMailData,configData).newMailData
        const newFileImages = newMailData.data.body.bodyContent.images

        const imagesLength = images.length
        const newFileImagesLength = newFileImages.length
        const newFileImagesStrigify = JSON.stringify(newFileImages)
        const imagesStringify = JSON.stringify(images)

        assert.equal(newFileImagesLength,imagesLength)
        assert.equal(newFileImagesStrigify,imagesStringify)
    })
})