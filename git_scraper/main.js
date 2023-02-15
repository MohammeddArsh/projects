const url = "https://github.com/topics"
const request = require("request")
const cheerio = require("cheerio")
const extractdataobj = require("./extract")

request(url,function cb(err,response,html){
    if(err) console.log("error:",err)
    else extracthtml(html)
})

function extracthtml(html){
    let $ = cheerio.load(html)
    let link = $('.no-underline.d-flex.flex-column.flex-justify-center')
    for(let i =0;i<link.length;i++){
        let topics = $(link[i]).attr("href")
        let topicname = topics.split('/')
        let topiclink = "https://github.com"+ topics
        topicname = topicname[2]
        console.log(topicname,topiclink)
        extractdataobj.extractdata(topiclink,topicname)
    }
}