const { assert } = require("chai")
const sendImages = require('../sendImages')

describe('sendImages',()=>{
    // it('should be pass the data correctly',()=>{
    //     const configData = {
    //         smtp:{
    //             host: 'smtp://192.3943.33:8000',
    //             user: 'aaaa',
    //             password: '123',
    //             secure: true
    //         }  
    //     }

    //     const sendMailData = {
    //         mail:{
    //             to: 'dsfsdf@dsfsdf.com',
    //             from: 'sdfsdf@fdsf.com',
    //             subject: 'assunto xxx',
    //             body: {
    //                 bodyType: 'ejs',
    //                 content: 'ejs ejs xxx',
    //                 images: [
    //                     {
    //                         filename: 'imageTest',
    //                         filePath: '/imagesTest/imageTest.jpg',
    //                         cid: 'cid'
    //                     }
    //                 ]                  
    //             }
    //         }
            
    //     }

    //     const {mail} = sendMailData

    //     const images = mail.body.images

    //     let content = mail.body.content

    //     sendImages(images,content,sendMailData,configData)

    //     assert.isTrue(images != null || images != undefined)
    //     assert.isTrue(content != null || content != undefined)
    //     assert.isTrue(sendMailData != null || sendMailData != undefined)
    //     assert.isTrue(configData != null || configData != undefined)
    // })

    it('should be returned buffer if pass just buffer',()=>{
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

        const newFileImages = sendImages(images,content,sendMailData,configData).newFileImages

        const imagesLength = images.length

        const newFileImagesLength = newFileImages.length

        assert.equal(newFileImagesLength,imagesLength)
        assert.equal(newFileImages.buffer,images.buffer)
    })
})