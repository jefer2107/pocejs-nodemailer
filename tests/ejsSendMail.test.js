const { assert } = require("chai")
const sendMail = require("../emailService")
const ejsSendMail = require('../index')
const sinon = require('sinon')

describe('ejsSendMail Test',()=>{
    describe('send',()=>{
        it('configData and mailData should be pass correctly',()=>{
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

            ejsSendMail(configData).send(sendMailData)

            assert.isTrue(configData != null || configData != undefined)
            assert.isTrue(sendMailData != null || sendMailData != undefined)
            assert.isTrue(sendMailData.mail.from != null || sendMailData.mail.from !== undefined)
            assert.isTrue(sendMailData.mail.to != null || sendMailData.mail.to !== undefined)
        })

        it('should be return error if pass value empty in smtp config',()=>{

            try {
                ejsSendMail()
            } catch (e) {
                assert.equal(e.message, 'Config data not configured')
            }
            
        })

        it('should be return error if pass value empty in mail mailData',()=>{
            const configData = {
                smtp:{
                    host: 'smtp://192.3943.33:8000',
                    user: 'aaaa',
                    password: '123',
                    secure: true
                }  
            }

            try {
                ejsSendMail(configData).send()
            } catch (e) {
                assert.equal(e.message, 'mailData wasn´n informed')
            }
        })

        it('should be return error if pass value empty of the mailData.from',()=>{

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
                    from: '',
                    subject: 'assunto xxx',
                    body: {
                        bodyType: 'text',
                        content: 'texto texto xxx'                    
                    }
                }
                
            }

            try {
                ejsSendMail(configData).send(sendMailData)
            } catch (e) {
                assert.equal(e.message, 'from should be set')
            }
        })

        it('Bodycontent should be the same as content passed by mailData with bodyType text',()=>{

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

            const data = {
                smtp:{
                    host: 'smtp://192.3943.33:8000',
                    user: 'aaaa',
                    password: '123',
                    secure: true
                }  
            }

            const sendMail = ejsSendMail(data).send(sendMailData).newMailData.data

            assert.equal(sendMailData.mail.body.content,sendMail.body.bodyContent)
        })

        it('Bodycontent must be the same as content passed by mailData with bodyType html',()=>{

            const sendMailData = {
                mail:{
                    to: 'dsfsdf@dsfsdf.com',
                    from: 'sdfsdf@fdsf.com',
                    subject: 'assunto xxx',
                    body: {
                        bodyType: 'html',
                        content: 'html html xxx'                    
                    }
                }
                
            }

            const data = {
                smtp:{
                    host: 'smtp://192.3943.33:8000',
                    user: 'aaaa',
                    password: '123',
                    secure: true
                }  
            }

            const sendMail = ejsSendMail(data).send(sendMailData).newMailData.data

            assert.equal(sendMailData.mail.body.content,sendMail.body.bodyContent.content)
        })

        it('Bodycontent must be the same as content passed by mailData with bodyType ejs',()=>{

            const sendMailData = {
                mail:{
                    to: 'dsfsdf@dsfsdf.com',
                    from: 'sdfsdf@fdsf.com',
                    subject: 'assunto xxx',
                    body: {
                        bodyType: 'ejs',
                        content: 'ejs ejs xxx'                    
                    }
                }
                
            }

            const data = {
                smtp:{
                    host: 'smtp://192.3943.33:8000',
                    user: 'aaaa',
                    password: '123',
                    secure: true
                }  
            }

            const sendMail = ejsSendMail(data).send(sendMailData).newMailData.data

            assert.equal(sendMailData.mail.body.content,sendMail.body.bodyContent.content)
        })

        let sendMailServiceStub
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

            const data = {
                smtp:{
                    host: 'smtp://192.3943.33:8000',
                    user: 'aaaa',
                    password: '123',
                    secure: true
                }  
            }

            before(()=>{
                sendMailServiceStub = sinon.stub(sendMail,'send')
            })

            beforeEach(()=>{
                sendMailServiceStub.reset()
            })

            after(()=>{
                sendMailServiceStub.restore()
            })
            
        it('sendMail.send should exec successfully',()=>{
            
            ejsSendMail(data).send(sendMailData)
            
            assert.equal(sendMailServiceStub.callCount, 1)

        })

        it('Should get error when happens error in external sendMail.send e-mail service',()=>{
            
            sendMailServiceStub.throws(new Error('Test123'))
            
            assert.throws(()=>ejsSendMail(data).send(sendMailData),'Send mail fail.Test123')

        })

    })

})