const ejsSendMail = require('./index')
const ejs = require('ejs')

ejsSendMail({
    smtp: {
        host: "smtp.gmail.com",
        user:'wx2sistemasteste@gmail.com',
        password:'m3t@lp0p0',
        port: 587,
        secure: false
    }
}).send({
    mail: {
        from: 'wx2sistemasteste@gmail.com',
        to:'jefer.ld@hotmail.com',
        subject:'Mensagem para o Francisco',
        body: {
            bodyType: 'text',
            content: `Testando`,
            
                
        }
    }
})