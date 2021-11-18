const { assert } = require("chai")
const ejsCompiler = require('../ejsCompiler')

describe('ejsCompiler',()=>{
    it('content should be send correctly when pass the bodytype ejs',()=>{
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

        const {mail} = sendMailData

        ejsCompiler(mail.body.content,mail.body?.ejsModel)

        assert.isTrue(mail.body.content != null || mail.body.content != undefined)
    })

    it('should be return error if pass body.content empty',()=>{

        assert.throws(()=> ejsCompiler(),'ejsTemplate not exists.')
    })
})