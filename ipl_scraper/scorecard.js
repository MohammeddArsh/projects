// const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
const request = require("request")
const cheerio = require("cheerio")
const fs = require("fs")
const path = require("path")
const xlsx = require("xlsx")

function processlinks(url){request(url,cb)}

function cb(err,response,html){
    if(err) console.log("error:",err)
    else extractdata(html);
}

function extractdata(html){
    let $ = cheerio.load(html)
    let result = $(".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title").text()
    let venuedate = $(".ds-text-tight-m.ds-font-regular.ds-text-ui-typo-mid")
    let venuedatearr = venuedate.text().split(',')
    let venue = venuedatearr[1].trim()
    let date = venuedatearr[2].trim() +","+ venuedatearr[3].trim() 
    let innings = $(".ds-bg-fill-content-prime.ds-rounded-lg")
    
    for(let i=0;i<innings.length;i++){
        let teams = $(innings[i]).find("span.ds-uppercase").text().split("INNINGS")
        let teamname = teams[0].trim()
        let cinning = $(innings[i])
        let rows = cinning.find(".ds-w-full.ds-table.ds-table-xs.ds-table-fixed.ci-scorecard-table tr")
        console.log(teamname,venue,date,result)
        for(let j = 0;j<rows.length;j++){
            let flag = $(rows[j]).hasClass("ds-hidden") 
            let cols,data
            if(flag == false) cols = $(rows[j]).find("td")
            else continue
            if($(cols).length>=8){
            let player = $(cols[0]).text().trim()
            let runs = $(cols[2]).text().trim()
            let balls = $(cols[3]).text().trim()
            let fours = $(cols[5]).text().trim()
            let sixes = $(cols[6]).text().trim()
            let sr = $(cols[7]).text().trim()
            console.log(player,runs,balls,fours,sixes,sr)
            processplayer(teamname,player,runs,balls,fours,sixes,sr,date,venue,result)
            }
            else continue
        }
    }   
}

function processplayer(teamname,player,runs,balls,fours,sixes,sr,date,venue,result){
    let teampath = path.join(__dirname,"IPL",teamname)
    createDir(teampath)
    let filepath = path.join(teampath,player + ".xlsx")
    let content = excelReader(filepath,player)
    let playerobj = {
        teamname,
        player,
        runs,
        balls,
        fours,
        sixes,
        sr,
        date,
        venue,
        result
    }
    content.push(playerobj)
    excelwriter(filepath,content,player)
}

function createDir(filepath){
    if(!fs.existsSync(filepath))
        fs.mkdirSync(filepath)
    else return;
}

function excelReader(filepath,sheetName){
    if(fs.existsSync(filepath) == false) return [];
    let wh = xlsx.readFile(filepath)
    let exceldata = wh.Sheets[sheetName]
    let ans = xlsx.utils.sheet_to_json(exceldata)
    return ans
}

function excelwriter(filepath,json,sheetName){
    let newWB = xlsx.utils.book_new()
    let newWS = xlsx.utils.json_to_sheet(json)
    xlsx.utils.book_append_sheet(newWB,newWS,sheetName)
    xlsx.writeFile(newWB,filepath)
}

module.exports = {
    ps:processlinks
}