const request = require("request")
const cheerio = require("cheerio")
const passlinksobj = require("./scorecard")

function scrapresults(url){
    request(url,function (err,response,html){
        if(err) console.log("error:",err)
        else extractscorecard(html);
    })

    function extractscorecard(html){
        let $ = cheerio.load(html);
        let matches = $('a[href$="full-scorecard"]')
        let allmatchlinks
        for(let i=0;i<matches.length;i++){
            if($(matches[i]).attr("href") != $(matches[i-1]).attr("href"))
                allmatchlinks = "https://www.espncricinfo.com" + $(matches[i]).attr("href")
            else continue
            console.log(allmatchlinks)
            passlinksobj.ps(allmatchlinks)
        }        
        
    }
}

module.exports = {
    allmatch : scrapresults
}