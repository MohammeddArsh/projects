let fs = require("fs")

function dashB(filename){ 
    let buffer = fs.readFileSync(filename,'utf8').split('\n');
    let j = 1    
    for(let i = 0;i<buffer.length;i++){
        if(buffer[i] != '')
            buffer[i] = (j++)+" "+buffer[i]     
    }
    let temp = buffer.join("\n")
    fs.writeFileSync(filename,temp)
}

module.exports={
    dashBKey : dashB
}