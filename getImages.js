const fs = require('fs')
const path = require('path')

const getImages = (setImages)=>{
    const filename = setImages[0].filename
    const filePath = setImages[0].filePath
    const cid = setImages[0].cid
    const buffer = setImages[0].buffer

    if(buffer){
        const imageConfig = [
            {
                filename,
                content: new Buffer(buffer),
            }
        ]

        return imageConfig

    }else{
        fs.readFile(path.join(__dirname,filePath),(erro,buffer)=>{
            if(erro)
            {
                throw Error('Image can´t set')
    
            }else{
                const imageConfig = [
                    {
                        filename,
                        content: buffer,
                        cid
                    }
                ]
                
                return imageConfig
     
            }
    
        })
    }
     
}

module.exports = getImages