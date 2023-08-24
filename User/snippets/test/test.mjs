import yaml from "js-yaml"
import { createReadStream } from 'node:fs';
import * as fs from 'node:fs/promises';

let stats;
try {
            await fs.access("./meta.code-snippets.in.yml", fs.constants.F_OK);
    stats = await fs.stat("./meta.code-snippets.in.yml");
} catch (err) {
    console.error(process.argv[0], " has failed! aborting");
    console.error(err.message);
    process.exit(1);
}

let inputBuffer  = "";
let source = createReadStream("./meta.code-snippets.in.yml", { encoding: "utf8" });
    source.on("data", (chunk) => {
      inputBuffer+=chunk;
    });

    source.on('end', () => {
      console.log("Your stdin is:");
      console.log(inputBuffer.slice(0, Math.pow(2,9) ));
    });


    /* Alias to this.call */
    methodX(){ return this.call.apply(this, arguments); }

doc