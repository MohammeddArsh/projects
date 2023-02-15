const puppeteer = require("puppeteer")
const url = 'https://www.hackerrank.com/auth/login'
const email = "testroboacc@gmail.com"
const pw = "automationtest"
const answerobj = require('./answers');

let page;

const openBrowserpromise = await puppeteer.launch({
    headless:false,
    defaultViewport:false,
    args:["--start-maximized"]
})

openBrowserpromise.then(function (browser){
    return browser.pages()
}).then(function(browserPages){
    page = browserPages[0]
    return page.goto(url)
})
.then(function (){
    return page.waitForSelector('input[type="text"]',{visible:true})
})
.then(function (){
    return page.type('input[type="text"]',email)
})
.then(function (){
    return page.type('input[type="password"]',pw)
})
.then(function (){
    return page.click(".form-item.clearfix .ui-content.align-icon-right")
})
.then(function (){
    return waitAndClick('a[data-attr1="algorithms"]',page)
})
.then(function (){
    return waitAndClick('input[value="warmup"]',page,{delay:50})
})
.then(function (){
    return page.$$('.challenge-submit-btn',{delay:50})
})
.then(function (questionsarr){
    console.log("no. of questions:",questionsarr.length)
    for(let i=1;i<=2;i++){
        
        return new Promise(function(resolve,reject){
            let autosolve = questionSolver(page,questionsarr[i],answerobj.answers[i-1])
            .then(function(){
                return autosolve
            }).then(function (){
                resolve()
            }).catch(function (err){
                reject()
            })
        })
    }
})
.catch(function(err){
    console.log(err)
})

function waitAndClick(selector,cpage){
    return new Promise(function (resolve,reject){
        let waitfor = cpage.waitForSelector(selector)
        waitfor.then(function (){
            return page.click(selector)
        }).then(function (){
            resolve()
        }).catch(function (err){
            reject()
        })
    })
}

function questionSolver(page,question,answer){
    return new Promise(function (resolve,reject){
        let questionClickpromise = question.click()
        questionClickpromise.then(function (){
            return waitAndClick('.monaco-editor.no-user-select .vs',page)
        })
        .then(function(){
            return waitAndClick('input[type="checkbox"]',page)
        })
        .then(function(){
            return page.type('input[type="checkbox"]',answer,{delay:10})
        })
        .then(function(){
            return page.keyboard.down("Control")
        })
        .then(function(){
            return page.keyboard.down("A",{delay:100})
        })
        .then(function(){
            return page.keyboard.down("X",{delay:100})
        })
        .then(function(){
            return page.keyboard.up("Control")
        })
        .then(function(){
            return page.click('.monaco-editor.no-user-select .vs')
        })
        .then(function(){
            return page.keyboard.down("Control")
        })
        .then(function(){
            return page.keyboard.down("A",{delay:100})
        })
        .then(function(){
            return page.keyboard.down("V",{delay:100})
        })
        .then(function(){
            return page.keyboard.up("Control")
        })
        .then(function(){
            return page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled')
        })
        .then(function(){
            return page.waitfor(3000)
        })
        .then(function(){
            return page.goto('https://www.hackerrank.com/domains/algorithms')
        })
        .then(function (){
            resolve()
        })
        .catch(function (err){
            reject()
        })
    })
}