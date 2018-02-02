(function() {
    var buffer = require('safe-buffer').Buffer;
    var code = buffer.from('{{code}}', 'hex');
    var decoded = buffer.allocUnsafe(0);

    for(var i = 0; i < code.length; i = i + {{number}})
        decoded = buffer.concat([ decoded, code.slice(i+1, i + {{number}})]);

    eval(decoded.toString('utf8'));
})();
