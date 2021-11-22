const { assert } = require("chai")
const getMailOptions = require('../getMailOptions')
const ejsSendMail = require('../index')
const sendImages = require('../sendImages')

describe('getImailOptions',()=>{
    it('mailData and bodyType should be pass correctly',()=>{
        const configData = {
            smtp:{
                host: 'smtp://123456ggggg',
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
                    bodyType: 'text',
                    content: 'texto texto xxx'                    
                }
            }
            
        }

        const mailData = ejsSendMail(configData).send(sendMailData).newMailData.data

        const {bodyType} = mailData.body

        getMailOptions(mailData,bodyType)

        assert.isTrue(mailData != null || mailData != undefined)
        assert.isTrue(mailData.to != null || mailData.to != undefined)
        assert.isTrue(mailData.from != null || mailData.from != undefined)
        assert.isTrue(bodyType != null || bodyType != undefined)
    })

    it('should be return data correctly when pass the bodytype text',()=>{
        const configData = {
            smtp:{
                host: 'smtp://123456ggggg',
                user: 'aaaa',
                password: '123',
                secure: true
            }  
        }
        const sendMailData = {
            mail:{
                from: 'dsfsdf@dsfsdf.com',
                to: 'sdfsdf@fdsf.com',
                subject: 'assunto xxx',
                body: {
                    bodyType: 'text',
                    content: 'texto texto xxx'                    
                }
            }
            
        }

        const mailData = ejsSendMail(configData).send(sendMailData).newMailData.data

        const {bodyType} = mailData.body

        getMailOptions(mailData,bodyType)

        assert.equal(sendMailData.mail.body.content,mailData.body.bodyContent)

    })

    it('should be return data correctly when pass the bodytype html or ejs',()=>{
        const configData = {
            smtp:{
                host: 'smtp://123456ggggg',
                user: 'aaaa',
                password: '123',
                secure: true
            }  
        }
        const sendMailData = {
            mail:{
                from: 'dsfsdf@dsfsdf.com',
                to: 'sdfsdf@fdsf.com',
                subject: 'assunto xxx',
                body: {
                    bodyType: 'html',
                    content: 'html html xxx'
                                          
                }
            }
            
        }

        const mailData = ejsSendMail(configData).send(sendMailData).newMailData.data

        const {bodyType} = mailData.body

        getMailOptions(mailData,bodyType)

        assert.equal(sendMailData.mail.body.content,mailData.body.bodyContent.content)

    })

    it('should be return data correctly when pass the bodytype html or ejs with images',()=>{
        const configData = {
            smtp:{
                host: 'smtp://123456ggggg',
                user: 'aaaa',
                password: '123',
                secure: true
            }  
        }
        const sendMailData = {
            mail:{
                from: 'dsfsdf@dsfsdf.com',
                to: 'sdfsdf@fdsf.com',
                subject: 'assunto xxx',
                body: {
                    bodyType: 'html',
                    content: 'html html xxx',
                    images:[
                        {
                            filename: 'node',
                            buffer: 'buffer 1'
                        },
                        {
                            filename: 'html 1',
                            buffer: 'buffer 2'
                        }
                        
                    ]
                                          
                }
            }
            
        }

        const {content} = sendMailData.mail.body

        const mailData = sendImages(content,sendMailData,configData).newMailData.data

        const {bodyType} = mailData.body

        const mailOptions = getMailOptions(mailData,bodyType).mailOptions

        const {images} = mailData.body.bodyContent
        const imagesLength = images.length
        const imagesMailOptions = mailOptions.attachments
        const imagesMailOptionsLength = imagesMailOptions.length
        const imagesStringify = JSON.stringify(images)
        const imagesMailOptionsStringify = JSON.stringify(imagesMailOptions)

        assert.equal(imagesLength,imagesMailOptionsLength)
        assert.equal(imagesStringify,imagesMailOptionsStringify)

    })
})