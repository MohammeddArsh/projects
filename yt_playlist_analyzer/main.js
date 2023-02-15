const puppeteer = require("puppeteer") 
const url = "https://www.youtube.com/playlist?list=PLNxOe-buLm6cz8UQ-hyG1nm3RTNBUBv3K";
const fs = require("fs")
const pdf = require("pdfkit")
let cpage;

(async function (){
    try{
        const browserInstance = await puppeteer.launch({
        headless:false,
        defaultViewport:false,
        args:["--start-maximized"]
    })
        let newTab = await browserInstance.pages()
        cpage = newTab[0]
        await cpage.goto(url)
        await cpage.waitForSelector('h1#title')
        let title = await cpage.evaluate(function (select){return document.querySelector(select).innerText},'h1#title')
        let stats = await cpage.evaluate(getstats,'#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer')
        
        let vids = stats.videos.split(' ')
        let nvids = vids[0].replace(/,/g, '');
        let currentvids = await currVids();
        
        
        while(nvids-=currentvids >= 0){ 
            await scrollBottom()
        }
        let list = await getNameDuration()
        
        let pdfdoc = new pdf
        pdfdoc.pipe(fs.createWriteStream(title+'.pdf'))
        pdfdoc.text(JSON.stringify(list))
        pdfdoc.end()
        console.log("PDF created successfully.")

    }
    catch(error){
        console.log(error)
    }
})();

function getstats(selector){
    let allstats = document.querySelectorAll(selector)
    let videos = allstats[0].innerText
    let views = allstats[1].innerText 
    return{
        videos,views
    }
}

async function currVids(){
    let length = await cpage.evaluate(getlength,'#container>#thumbnail span.style-scope.ytd-thumbnail-overlay-time-status-renderer')
    return length
}

function getlength(durationselector){
    let duration = document.querySelectorAll(durationselector)
    return duration.length
}

async function scrollBottom(){
    await cpage.evaluate(goToBottom)
    function goToBottom(){
        window.scrollBy(0,window.innerHeight)
    }
}

async function getNameDuration(){
    let list = cpage.evaluate(nameAndDuration,'#video-title[title]','#container>#thumbnail span.style-scope.ytd-thumbnail-overlay-time-status-renderer')
    return list
}

function nameAndDuration(videoselector,durationselector){
    let video = document.querySelectorAll(videoselector)
    let duration = document.querySelectorAll(durationselector)

    let list = []
    for(let i = 0;i<duration.length;i++){
        let vid = video[i].innerText
        let dur = duration[i].innerText
        list.push({vid,dur})
    }
    return list
}
