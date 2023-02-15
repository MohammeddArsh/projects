let fs = require("fs")

function dashN(filename){
    let buffer = fs.readFileSync(filename,'utf8').split('\n');
    
    for(let i = 0;i<buffer.length;i++){
        buffer[i] = (i+1)+" "+buffer[i]     
    }
    let temp = buffer.join("\n")
    fs.writeFileSync(filename,temp)
}
module.exports={
    dashNKey : dashN
}