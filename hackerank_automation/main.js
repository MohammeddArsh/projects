const puppeteer = require("puppeteer")
const url = 'https://www.hackerrank.com/auth/login'
const email = "testroboacc@gmail.com"
const pw = "automationtest"
const answerobj = require('./answers');

let page;

(async function(){
    try{
        const browserinstance = await puppeteer.launch({
            headless:false,
            defaultViewport:false,
            args:["--start-maximized"]
        })
        
        const newTab = await browserinstance.pages();
        let page = newTab[0]
        await page.goto(url)
        await page.type('input[type="text"]',email)
        await page.type('input[type="password"]',pw)
        await page.click(".form-item.clearfix .ui-content.align-icon-right")
        await waitAndClick('a[data-attr1="algorithms"]',page)
        await waitAndClick('input[value="warmup"]',page,{delay:50})
        let questionarr = await page.$$('.challenge-submit-btn',{delay:50})
        for(let i=1;i<=3;i++){
            await questionSolver(page,questionarr[i],answerobj.answers[i-1])
            questionarr = await page.$$('.challenge-submit-btn',{delay:50})
            console.log("Solved",i)
        }
        
    }
    catch(error){
        console.log(error)
    }

})()

async function waitAndClick(selector,cpage){
    await cpage.waitForSelector(selector)
    return await cpage.click(selector)        
}

async function questionSolver(page,question,answer){
        await question.click()
        await waitAndClick('.monaco-editor.no-user-select .vs',page)
        await waitAndClick('input[type="checkbox"]',page)
        await page.type('.checkBoxWrapper .input-wrap',answer,{delay:10})
        await page.keyboard.down("Control")
        await page.keyboard.down("A",{delay:100})
        await page.keyboard.down("X",{delay:100})
        await page.keyboard.up("Control")
        await page.click('.monaco-editor.no-user-select .vs')
        await page.keyboard.down("Control")
        await page.keyboard.down("A",{delay:100})
        await page.keyboard.down("V",{delay:100})
        await page.keyboard.up("Control")
        await page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled')
        await page.waitForTimeout(4000)
        return await page.goto('https://www.hackerrank.com/domains/algorithms?filters%5Bsubdomains%5D%5B%5D=warmup')
}
