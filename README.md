# Require2
[![Build Status](https://travis-ci.org/misaka-ink/require2.svg?branch=master)](https://travis-ci.org/misaka-ink/require2)

English | [简体中文](./README_zh.md)

> `Require2` is an enhanced version of builtin `require` module. It supports alias to simplify your tedious require statement and also provides some experiential features. 

## Install

`npm install @misaka.ink/require2`

## Getting Started

Add field `alias` to maintain mapping rules in your `package.json` file, all path should be related to the dir of `package.json` path.

**CAUTION**: when using`require2(${module})`, only the nearest `package.json` to current js file will be used.

##### Real World Examples

> Your package.json file

```json
{
    "alias": {
        "@x": "@lerna",
        "@components": "./packages/components/src/"
    }
}
```

```javascript
require('@misaka.ink/require2') // include require2 in your entry file, which only need once
```

```javascipt
require2('@components/header') // => equal to `require('<PROJECT_ROOT>/packages/components/src/header')`
require2('@x/version') // => equal to `require('@lerna/version')`
```

## Experiential features

### 1. Auto-adds environment-related postfix when requiring.

###### Without `require2`

```javascript
const env = {
    development: require('./conf'),
    production: require('./conf.prod.json'),
    test: require('./conf.test')
}[process.env.NODE_ENV || 'development']
```

`require2` provides a method to add `envmap` files to reduce env based code.

**CAUTION**: the `.json` postfix is strictly required to enable this feature. And you can use envmap with alias without any conflict.


##### With `require2` Examples

```json
{
    "envmap": {
        "production": "prod",
        "test": "test",
        "[NODE_ENV]": "[ABBR]"
    }
}
```

```javascript
/**
    below is statement is equal to 
    ```javascript
    const env = {
        development: require('./conf'),
        production: require('./conf.prod.json'),
        test: require('./conf.test')
    }[process.env.NODE_ENV || 'development']
    ```
*/
const conf = require2('./conf.json')
```

##### alias suppport

```javascript
/**
    below is statement is equal to 
    ```javascript
    const env = {
        development: require('<PROJECT_ROOT>/packages/components/src/mainfest.json'),
        production: require('<PROJECT_ROOT>/packages/components/src/mainfest.prod.json'),
        test: require('<PROJECT_ROOT>/packages/components/src/mainfest.test.json'),
    }[process.env.NODE_ENV || 'development']
    ```
*/
require2('@components/mainfest.json')
```
