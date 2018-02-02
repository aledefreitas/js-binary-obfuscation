# JavaScript Binary Obfuscation

## Installation

```sh
    npm -g install js-binary-obfuscation
```

## Usage

```sh
    js-binary-obfuscation /path/to/file > /path/to/obfuscated/file
```

## How it works?

It uses [JavaScript Obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator) to obfuscate the given code, and then adds some random bytes to it, finally it encodes the file and returns a completely obfuscated file with random bytes hex encoded inside the code.
