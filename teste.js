const ejsSendMail = require('./index')
const ejs = require('ejs')

ejsSendMail({
    smtp: {
        host: "smtp.gmail.com",
        user:'wx2sistemasteste@gmail.com',
        password:'m3t@lp0p0',
        secure: true
    }
}).send({
    mail: {
        from: 'wx2sistemasteste@gmail.com',
        to:'jefer210784@gmail.com',
        subject:'the message test',
        body: {
            bodyType: 'ejs',
            content: `<h1> <%=name%> </h1> <p> <%=message%> </p>`,
            ejsModel: {
                name: 'Rogerio',
                message: 'Testing message...'
            },
            images:[
                {
                    filename: 'node',
                    filePath: '/images/node.png',
                    cid: 'node'
                }
            ]
        }
    }
})



