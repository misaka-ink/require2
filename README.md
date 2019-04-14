# Require2
[![Build Status](https://travis-ci.org/misaka-ink/require2.svg?branch=master)](https://travis-ci.org/misaka-ink/require2)

Add alias feature for require function in nodejs

## USAGE

1. Install
```bash
npm i -P @misaka.ink/require2
```

2. Require
```javascript
const require2 = require('@misaka.ink/require2')

// global
const module = require2('modoule')
```

3. Configuration - package.json
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

## Todo

前缀后缀