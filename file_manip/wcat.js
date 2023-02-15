#!/usr/bin/env node
let input = process.argv.slice(1)
let fs = require("fs")
let dashBobj = require("./dashB")
let dashNobj = require("./dashN")
let dashSobj = require("./dashS")
let command = []
let file = []
let j = 0
let k = 0

for(let i = 1;i < input.length; i++){
    if(input[i] == "-s"||input[i] == "-n"||input[i] == "-b"){
        command[k] = input[i]
        k++
    }
    else{
        file[j] = input[i]
        j++
    }
}

if(fs.existsSync("temp.txt"))
    fs.unlinkSync("temp.txt")

for(let i = 0;i<file.length;i++){
    let buffer = fs.readFileSync(file[i])
    fs.appendFileSync("temp.txt",buffer+"\n")
}

let flag1=false,flag2=false
for(let i = 0;i<command.length;i++){
    if(command[i] == "-s") dashSobj.dashSKey("temp.txt")
    if(command[i]=="-n") flag1=true
    if(command[i]=="-b") flag2=true
}


for(let i = 0;i<command.length;i++){
    if(flag1 == true&&flag2==true){
        console.log("ERROR Both -n and -b cannot be used together")
        process.exit(1)
    }
    if(command[i] == "-n"){
        dashNobj.dashNKey("temp.txt")
    }
    if(command[i] == "-b"){
        dashBobj.dashBKey("temp.txt")
    }
}

let buffer = fs.readFileSync("temp.txt",'utf8')
console.log(buffer)

fs.unlinkSync("temp.txt")