let fs = require("fs")

function dashS(filename){
    let buffer = fs.readFileSync(filename,'utf8').replace(/\n{2,}/g, '\n\n').trim();
    let temp = buffer.toString()
    fs.writeFileSync(filename,temp)
}

module.exports={
    dashSKey : dashS
}