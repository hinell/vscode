#!/usr/bin/env -S node
// ./User/toools/gitcommit-gen.js > User/snippets/gitcommit.code-snippets

// Nuls over here are for nothing 
let message_types = {
	"feat"    : null,
	"fix"     : null,
	"refactor": null,
	"chore"   : null,
	"ci"      : null,
	"docs"    : {
		scope: [ "*", "README.md", "DEVELOPMENT.md" ]
	},
	"perf"    : null,
	"style"   : null,
	"test"    : null,
} 

var snippets = Object.keys(message_types).reduce(function(snippets, message_type, i) {
	let message_scope = [ "*" ]
	let message_obj = message_types[message_type]
	if (message_obj) {
		message_scope = message_obj.scope
	}
	let snip = {}
	snip.prefix = "cc." + message_type
	snip.description = "Conventional commits message"
	snip.body = [
		"${1:" + message_type + "}(${2|" + message_scope.join(",") + "|}): ${3}",
		"",
		"$0"
	]

	snippets["cc " + message_type] = snip
	return snippets
}, {})

var snippets2 = Object.keys(message_types).reduce(function(snippets, message_type, i) {

	let message_scope = [ "*" ]
	let message_obj = message_types[message_type]
	if (message_obj) {
		message_scope = message_obj.scope
	}

	if (message_type != "feat") {
		return snippets
	}

	let snip = {}
	snip.prefix = "cc." + message_type + "!"
	snip.description = "Conventional commits message"
	snip.body = [
		"${1:" + message_type + "}(${2|" + message_scope.join(",") + "|})!: ${3}",
		"",
		"BREAKING CHANGE: $0"
	]

	snippets["cc " + message_type + " !"] = snip
	return snippets
}, {})

console.clear()
let json = JSON.stringify(Object.assign(snippets, snippets2), null, 4) 
// console.log(json.substring(3,json.length - 1))
console.log(json)

