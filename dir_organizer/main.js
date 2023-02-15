#!/usr/bin/env node
let inputArr = process.argv.slice(2);
let fs = require("fs")
let path = require("path")
let treeObj = require("./tree")
let organizeObj = require("./organize")
let helpObj = require("./help");
const { treeKey } = require("./tree");

console.log(inputArr)

let command = inputArr[0]

switch(command){
    case "tree":
        treeObj.treeKey(inputArr[1])
    break

    case "organize":
        organizeObj.organizeKey(inputArr[1])
    break

    case "help":
        helpObj.helpKey();
    break

    default:
        console.log("Worng command")
}
