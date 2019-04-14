# Require2
[![Build Status](https://travis-ci.org/misaka-ink/require2.svg?branch=master)](https://travis-ci.org/misaka-ink/require2)

Add alias feature for require function in nodejs

## How to achieve

* Priority to get the most recent 'package.json' file
* Require modules based on this 'package.json' file relative path

## USAGE

### Install
```bash
npm i -P @misaka.ink/require2
```

### Intro
```javascript
const require2 = require('@misaka.ink/require2')
```

### Configuration `package.json`
```
// package.json

{
    ...,
    alias: [
        "${key1}": "${path1}",
        "${key2}": "${path2}",
        ...
    ]
}

```

## Example

## Todo

- prefixes / suffixes