/**
 * Created by wuhan01 on 2018/7/2.
 */

const path = require('path')
const currentPath = global.currentPath = process.cwd()

const require2 = global.require2 = function (moduleName) {
    const alias = require(path.join(process.cwd(), 'package.json')).alias

    if (alias) {
        for (const key in alias) {
            const regexp = new RegExp(key)
            if (regexp.test(moduleName)) {
                return require(path.resolve(currentPath, moduleName.replace(regexp, alias[key])))
            }
        }
    }

    return require(moduleName)
}

module.exports = require2
