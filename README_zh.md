# Require2
[![Build Status](https://travis-ci.org/misaka-ink/require2.svg?branch=master)](https://travis-ci.org/misaka-ink/require2)

Require2是对Nodejs module模块`require`的扩展，简化类似`../../../test`的相对路径编码，并增加了一些比较有意思的小功能

[English](./README.md) | 简体中文

## 安装

> npm install @misaka.ink/require2

## 使用方式

配置`package.json`文件，新增字段**alias**，添加模块映射信息，路径相对于该`package.json`的位置

> **注**: 在`require2(${module})`时，会优先使用*最近*的`package.json`文件

##### 例子

```json
{
    "alias": {
        "@moduleA": "a",
        "@moduleB": "./c"
    }
}
```

```javascript
require('@misaka.ink/require2')

// `require2`在global下，所以只需要require一次即可在各文件使用

require2('@moduleA/test')
```

## 小功能

#### 根据环境区分配置文件，目前仅支持**JSON**格式的配置文件

###### 例如

```javascript
// 开发环境

require('./conf')

// 生产环境
require('./conf.prod.json')

// 测试环境
require('./conf.test')
```

通过require2简化这一种写法，在`package.json`添加新字段`envmap`，添加环境映射

> 格式: `[NODE_ENV]: 文件环境`

> **注**: `require2('./conf.json')`，如果没有附带后缀`.json`会被忽略掉掉该映射的能力，也可通过不带后缀的方式而只使用**alias**能力

##### 例子

```json
{
    "envmap": {
        "production": "prod"
    }
}
```

```javascript
// 常规

// 开发环境
require2('./conf1.json')

// 生产环境
require2('./conf1.prod.json')

// -------------------------------
// 使用alias

// 开发环境
require2('@moduleA/conf2.json')

// 生产环境
require2('@moduleA/conf2.prod.json')

// -------------------------------
// 无.json后缀

// 开发环境
require2('@moduleA//conf3')

// 生产环境
require2('@moduleA//conf3')
```
