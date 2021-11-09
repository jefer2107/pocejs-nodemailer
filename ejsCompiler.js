const ejs = require('ejs')

const ejsCompiler = (ejsTemplate, data)=>{
    if(!ejsTemplate) throw Error('ejsTemplate not exists.')

    let template = ejs.compile(ejsTemplate)
    const html = template(data)
    return html  
}


module.exports = ejsCompiler