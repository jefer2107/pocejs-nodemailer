const { assert } = require("chai")
const sendMailService = require("./emailService")
const ejsSendMail = require('./index')
const sinon = require('sinon')
const ejsCompiler = require('./ejsCompiler')


describe('ejsSendMail Test',()=>{
    describe('config',()=>{
        it('config smtp should be saved',()=>{
            const data = {
                host: 'smtp://192.3943.33:8000',
                user: 'aaaa',
                password: '123',
                secure: true
            }

            const sendMail = ejsSendMail()

            sendMail.config(data)

            const {configData} = sendMail

            assert.isTrue(configData != null && configData != undefined)
            assert.isTrue(configData.smtp.host != null && configData.smtp.host != undefined)
            assert.isTrue(configData.smtp.user != null && configData.smtp.user != undefined)
            assert.isTrue(configData.smtp.password != null && configData.smtp.password != undefined)
            assert.isTrue(configData.smtp.secure != null && configData.smtp.secure != undefined)

            assert.equal(configData.smtp.host, data.host)
            assert.equal(configData.smtp.user, data.user)
            assert.equal(configData.smtp.password, data.password)
            assert.equal(configData.smtp.secure, data.secure)
        })

        it('should be return error if pass value empty or in smtp cpnfig',()=>{
            const sendMail = ejsSendMail()

            try {
                sendMail.config()
            } catch (e) {
                assert.equal(e.message, 'Config data not configured')
            }
            
        })
    })

    describe('send',()=>{
        let sendMailServiceStub
        const sendMailData = {
            to: 'dsfsdf@dsfsdf.com',
            from: 'sdfsdf@fdsf.com',
            subject: 'assunto xxx',
            body: {
                bodyType: 'text',
                content: 'texto texto xxx'                    
            }
        }

        getNewSendMail = ()=>{
            const sendMail = ejsSendMail()
            const data = {
                host: 'smtp://192.3943.33:8000',
                user: 'aaaa',
                password: '123',
                secure: true
            }
    
            sendMail.config(data)
            return sendMail
        }


        before(()=>{
            sendMailServiceStub = sinon.stub(sendMailService,'send')
        })

        beforeEach(()=>{
            sendMailServiceStub.reset()
        })

        after(()=>{
            sendMailServiceStub.restore()
        })

        it('send should exec successfully',()=>{
            const sendMail = getNewSendMail()
            
            sendMail.send(sendMailData)
            
            assert.equal(sendMailServiceStub.callCount, 1)

        })

        it('Should get error when happens error in external send e-mail service',()=>{

            sendMailServiceStub.throws(new Error('aaaaaa'))

            const sendMail = getNewSendMail()
            
            assert.throws(()=>sendMail.send(sendMailData),'Send mail fail.aaaaaa')
        })

        it('Should send body text correctly',()=>{
            const sendMail = getNewSendMail()
            sendMail.send(sendMailData)
            const args = sendMailServiceStub.getCall(0).args[0]

            assert.equal(args.body, sendMailData.body.content)
        })

        it('should send body ejs corrently',()=>{

            let ejsCompilerStub

            const sendMailDataEjs = {
                ...sendMailData,
                body:{
                    bodyType: 'ejs',
                    content: 'ejs bla bla bla',
                    ejsModel: 'data'
                }
            }

            // before(()=>{
            //     ejsCompilerStub = sinon.stub(ejsCompiler)
            // })

            const sendMail = getNewSendMail()
            sendMail.send(sendMailDataEjs)

            console.log('ejscompiler: ', ejsCompiler)

            //assert.equal(ejsCompiler.callCount, 1)

            
        })
    })
})