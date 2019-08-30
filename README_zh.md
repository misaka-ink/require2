# Require2
[![Build Status](https://travis-ci.org/misaka-ink/require2.svg?branch=master)](https://travis-ci.org/misaka-ink/require2)

该库是对Nodejs module模块`require`的扩展，简化类似于`../../../test`这样的相对路径问题，并增加了一些比较有意思的小功能来帮助开发

[English](./README.md) | 简体中文

## 使用方式

配置`package.json`文件，增加一个字段**alias**，添加映射，路径相对于该`package.json`的位置

> 在`require2(${module})`时，会优先使用*最近*的`package.json`文件

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

## 其他功能

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
> **注**: `require2('./conf.json')`，如果没有附带后缀`.json`会被忽略掉掉该映射的能力，也可用于只使用**alias**能力

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
