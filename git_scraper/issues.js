const request = require("request")
const cheerio = require("cheerio")
const fs = require("fs")
const path = require("path")
const pdfkit = require("pdfkit")

function extractissues(url,topic,reponame){request(url,function cb(err,response,html){
    if(err) console.log("error:",err)
    else extractdata(html,topic,reponame)
})
}

function extractdata(html,topic,reponame){
    let $ = cheerio.load(html)
    let links = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title")
    let arr = []
    for(let i=0;i<links.length;i++){
        let issues = "https://github.com" + $(links[i]).attr("href")
        arr.push(issues)
        
    }
    console.log(arr,"====",topic,reponame)
    let mainfolder = path.join(__dirname,"git topics")
    createdir(mainfolder)
    let folderpath = path.join(mainfolder,topic)
    createdir(folderpath)
    let filepath = path.join(folderpath,reponame+".pdf")
    let text = JSON.stringify(arr)

    let pdfobj = new pdfkit()
    pdfobj.pipe(fs.createWriteStream(filepath))
    pdfobj.text(text)
    pdfobj.end()
    // fs.writeFileSync(filepath)
}
function createdir(filepath){
    if(!fs.existsSync(filepath))
        fs.mkdirSync(filepath)
    else return
}
module.exports = {
    extissues:extractissues
}