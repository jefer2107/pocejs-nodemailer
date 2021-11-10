const ejs = require('ejs')

const ejsCompiler = (ejsContent, data)=>{
    if(!ejsContent) throw Error('ejsTemplate not exists.')

    let template = ejs.compile(ejsContent)
    const html = template(data)
    return html  
}


module.exports = ejsCompiler