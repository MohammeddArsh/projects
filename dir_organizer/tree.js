let fs = require("fs")
let path = require("path")

function treefn(dirPath){
    if(dirPath == undefined){
        treehelper(process.cwd(),"")
        return;
    }
    else{
        let exist = fs.existsSync(dirPath)
        if(exist)
            treehelper(dirPath,"")
        else{
            console.log("Invalid Path")
            return
        }
    }
}

function treehelper(src,indent){
    let isFile = fs.lstatSync(src).isFile();
    if(isFile){
        let filename = path.basename(src);
        console.log(indent+"--->"+filename)
    }
    else{
        let dirName = path.basename(src)
        console.log(indent+"|--->"+dirName)
        let children = fs.readdirSync(src)
        for(let i = 0;i<children.length;i++){
            let childrenpath = path.join(src,children[i])
            treehelper(childrenpath,indent+"\t")
        }
    }
}

module.exports={
    treeKey : treefn
}