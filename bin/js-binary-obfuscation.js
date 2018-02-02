#!/usr/bin/env node
var fs = require('fs');

var JSBinaryObfuscation = require('../index.js');

if(!process.argv[2] || !fs.readFileSync(process.argv[2]))
    return;

var obfuscator = new JSBinaryObfuscation(process.argv[2]);

obfuscator.init();
