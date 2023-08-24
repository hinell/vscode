#!/usr/bin/env -S node
// File........: json-remove.dots.js
// Summary.....: Remove . (dot) from top keys of the json file
// Created.....: October 24, 2023 
// Authors.....: Alex A. Davronov <al.neodim@gmail.com> (2023-)
// Repository..: N/A
// Description.: Remove dot from keys of the json file 
// Usage.......: json-remove.dots.js input.json > output.json

let fs   = require("node:fs")
let path = require("node:path")

let nodePath   = process.argv[0]
let scriptPath = process.argv[1]
let targetFile = process.argv[2]

if (targetFile == null)
{
	console.error(`target json file is required`)
	process.exit(1)
	return
}
 
//---------------------------------------------------------------remDotsAndPrint
let remDotsAndPrint = function (targetFile) 
{
	let jsonIn  = JSON.parse(fs.readFileSync(targetFile, { encoding : "utf8"} ))
	let jsonOut = Object.keys(jsonIn).reduce(function (jsonOut, name, i) {
		jsonOut[name.replaceAll(".", " ")]=jsonIn[name]
		return jsonOut
	}, {});
	console.log(JSON.stringify(jsonOut, null, 4))
	// console.log(jsonOut)
}


fs.stat(targetFile,	function (err, stat) 
{
	if (err) {
	console.error()
		return 1
	}
	if (stat.isFile()) {
		remDotsAndPrint(targetFile)
	}
})

