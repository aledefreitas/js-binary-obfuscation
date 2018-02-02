var buffer = require('safe-buffer').Buffer;
var jsobfuscator = require('javascript-obfuscator');
var randombytes = require('randombytes');
var fs = require('fs');
var browserify = require('browserify');
var uglifyjs = require('uglify-js');

var JSBinaryObfuscation = function(file) {
    this.file = file;
};

JSBinaryObfuscation.prototype.init = function() {
    var code = uglifyjs.minify(buffer.from(fs.readFileSync(this.file)).toString('utf8')).code;
    var template = buffer.from(fs.readFileSync(__dirname + '/template.js')).toString('utf8');

    var obfuscated = jsobfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true
    });

    var code_buffer = buffer.from(obfuscated.getObfuscatedCode());
    var byteDepth = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
    var finalBuf = buffer.allocUnsafe(0);

    for(var i = 0; i < code_buffer.length; i = i+byteDepth) {
        var randomseed = randombytes(1);
        finalBuf = buffer.concat([ finalBuf, buffer.from(randomseed), code_buffer.slice(i, i+byteDepth)]);
    }

    var finalCode = template.replace(/\{\{number\}\}/gi, byteDepth + 1);

    fs.writeFile(__dirname + "/obfuscatedcode.js", finalCode, function(err) {
        if(err) {
            console.log(err);
            return;
        }

        browserify(__dirname + "/obfuscatedcode.js")
        .bundle(function(err, buf) {
            var finalCode = jsobfuscator.obfuscate(uglifyjs.minify(buf.toString('utf8')).code.replace(/\{\{code\}\}/gi, finalBuf.toString('hex')), {
                compact: true,
                controlFlowFlattening: true
            });

            process.stdout.write(finalCode.getObfuscatedCode());
        })
    });
};

module.exports = JSBinaryObfuscation;
