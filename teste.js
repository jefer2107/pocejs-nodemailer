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
        to:'jefer210784@gmail.com',
        subject:'the message test',
        body: {
            bodyType: 'ejs',
            content: `<h1>EJS</h1>`,
            images:[
                {
                    filename: 'node',
                    filePath:'images/node.png',
                    cid: 'node'
                },
                {
                    filename: 'html buffer',
                    buffer: 'buffer 1234'
                },
                {
                    filename: 'html filepath',
                    filePath:'images/html5.png',
                    cid: 'html'
                }
                
                
            ]
            
        }
    }
})