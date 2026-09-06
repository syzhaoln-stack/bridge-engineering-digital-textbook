"use strict";
const fs=require('node:fs'),path=require('node:path');
const katex=require(path.join(__dirname,'vendor/katex/katex.min.js'));
const input=JSON.parse(fs.readFileSync(0,'utf8'));
const rendered=input.map(item=>({tex:item.tex,display:item.display,html:katex.renderToString(item.tex,{displayMode:item.display,throwOnError:true,strict:'error',trust:false,output:'htmlAndMathml'})}));
process.stdout.write(JSON.stringify({version:katex.version,rendered}));
