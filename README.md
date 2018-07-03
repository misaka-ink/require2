# Require2
[![Build Status](https://travis-ci.org/SmilingXinyi/require2.svg?branch=master)](https://travis-ci.org/SmilingXinyi/require2)
Add alias feature for require function in nodejs

## USAGE

1. Install
```bash
npm i -P require-2
```

2. Require
```javascript
const require2 = require('require-2')

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

