/**
 * Created by Xinyi on 2018/7/2.
 */

const path = require('path')
const fs = require('fs')
const currentPath = global.currentPath = process.cwd()

const require2 = global.require2 = function (moduleName) {
    const packageInfo = getPackageInfo(__dirname)

    const alias = packageInfo.alias;

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

const getPackageInfo = dirname => {
    const packagePath = `${dirname}/package.json`
    if (fs.existsSync(packagePath)) {
        return require(packagePath);
    }
    else {
        const lastCharIndex = dirname.lastIndexOf('/')
        return getPackageInfo(dirname.substr(0, lastCharIndex))
    }
}

module.exports = require2
