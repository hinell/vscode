#!/usr/bin/env -S node
// File........: shellscript-log.gen.js
// Summary.....: Generate textmate snippets for loggin in shell
// Created.....: November 30, 2023 
// Authors.....: Alex A. Davronov <al.neodim@gmail.com> (2023-)
// Repository..: N/A
// Description.: See summary
// Usage.......: ./User/toools/shellscript-log.gen.js > User/snippets/shellscript-log.code-snippets
// ColorCode: 0 -> black   1 -> red     2 -> green   3 -> yellow  4 -> blue    5 -> magenta 6 -> cyan    7 -> white   
var log_types = {
    "info"    : 5,
	"i"       : 5, // info short (!)
	"skip"    : 5, // info skipping
    "ok"      : 2,
    "done"    : 2,
    "warn"    : 3,
    "error"   : 1,
    "fatal"   : 1,
    "aborting": 5
}

var snippets = Object.keys(log_types).reduce(function(obj, log_type, i) {
    let color_id = log_types[log_type]
    let prefix = log_type
    let redir_to_stderr = ""
	let message_placeholder = " ${5:message}."
	if (log_type == "i") {
		log_type = " !"
		message_placeholder = " ${5:message}."
	}
	if (log_type == "skip") {
		log_type = " !"
		message_placeholder = " ${5:message}. $(tput bold setaf 3)skipping ~$(tput sgr0)"
	}
    if (log_type == "error" || log_type == "fatal") {
		message_placeholder = " ${5:message}. Aborting."
        redir_to_stderr = " ${6:>&2 ;}"
    }
	if (log_type == "done"){
		message_placeholder = " ${5:done!} ✔"
	}
	if (log_type == "aborting"){
		prefix =  "abort" 
		message_placeholder = " ${5:message}."
	}
    
    obj["log " + prefix] = {
        prefix: "log." + prefix,
        description: "log " + log_type + " message",
        body: [
            `echo -e \"\\\${0}:\${1|$(tput setaf ${color_id}),$(tput setab ${color_id}),\${TERM_SET_AF_${color_id}\}|}` + ` ${log_type} ` 
            + `\${2|$(tput sgr0),\$\{TERM_SET_OP\}|}`
            + `${message_placeholder}\"${redir_to_stderr}$0`
        ]
  }

    return obj
}, {})

console.clear()
let json = JSON.stringify(snippets, null, 4) 
// console.log(json.substring(3,json.length - 1))
console.log(json)

// ./User/toools/gitcommit-gen.js > User/snippets/gitcommit.code-snippets
