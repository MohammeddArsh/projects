const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const request = require("request")
const cheerio = require("cheerio")
const fs = require("fs")
const path = require("path")
const allmatchobj = require("./allmatches")
const iplpath = path.join(__dirname,"IPL")
createDir(iplpath)

request(url,cb)

function cb(err,response,html){
    if(err) console.log("error:",err)
    else extractdata(html);
}

function extractdata(html){
    let $ = cheerio.load(html)
    let results = $('a[href$="match-results"]')
    let resultslink = "https://www.espncricinfo.com" + results.attr("href")
    allmatchobj.allmatch(resultslink)
}

function createDir(filepath){
    if(!fs.existsSync(filepath))
        fs.mkdirSync(filepath)
    else return
}