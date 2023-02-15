let fs = require("fs")
let path = require("path")
let types = {
    pictures: ["png","jpg","jpeg"],
    documents: ["psd","docx","pdf","doc"],
    videos: ["mp4","mov",""]
}

function organizefn(dirPath){
    let destpath
    if(dirPath == undefined){
        destpath = process.cwd();
        return;
    }
    else{
        let exist = fs.existsSync(dirPath)
        if(exist){
            destpath = path.join(dirPath,"Organized")
            if(fs.existsSync(destpath) == false)
                fs.mkdirSync(destpath);
        }
        else{
            console.log("Invalid Path")
            return
        }
    }
    organizehelper(dirPath,destpath);
    console.log("Organized for:" , dirPath)
}

function organizehelper(src,destpath){
    let childnames = fs.readdirSync(src)
    for(let i = 0;i < childnames.length;i++){
        let childAddress = path.join(src,childnames[i])
        let isFile = fs.lstatSync(childAddress).isFile()
        if(isFile){
            let category = getcategory(childnames[i])
            console.log(childnames[i],"\t",category)
            sendFiles(childAddress,destpath,category);
        }
    }

}

function getcategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1)
    for(let type in types){
        let cTypeArr = types[type]
        for(let i = 0;i < cTypeArr.length;i++){
            if(ext == cTypeArr[i])
                return type;
        }
    }
    return "Others"
}

function sendFiles(src,dest,category){
    let categorypath = path.join(dest,category)
    if(fs.existsSync(categorypath) == false){
        fs.mkdirSync(categorypath)
    }
    let filename = path.basename(src)
    let destfilepath = path.join(categorypath,filename)
    fs.copyFileSync(src,destfilepath)
    fs.unlinkSync(src)
    console.log(filename,"copied to = ",category)
}

module.exports={
    organizeKey : organizefn
}