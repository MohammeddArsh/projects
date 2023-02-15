const request = require("request")
const cheerio = require("cheerio")
const extissuesobj = require("./issues")

function extractfrom(url,topicname){request(url,function cb(err,response,html){
    if(err) console.log("error:",err)
    else extracthtml(html,topicname)
})
}
function extracthtml(html,topicname){
    let $ = cheerio.load(html)
    let issues = $('.tabnav-tabs a[href$="issues"]')
    
    for(let i=0;i<8;i++){
        let links = $(issues[i]).attr("href")
        let repos = links.split('/')
        let reponame =repos[2]
        let issueslink = "https://github.com" + links
        console.log(issueslink,reponame)
        // let temp = "https://github.com/flutter/flutter/issues"
        extissuesobj.extissues(issueslink,topicname,reponame)
    }
}


module.exports = {
    extractdata : extractfrom
}