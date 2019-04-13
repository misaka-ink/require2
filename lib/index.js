/**
 * Created by Xinyi on 2018/7/2.
 */

const path = require('path')
const fs = require('fs')
const currentPath = global.currentPath = process.cwd()


module.exports = function (dirname) {
    return global.require2 = function (moduleName) {
        const packageInfo = getPackageInfo(dirname || __dirname)
        const alias = packageInfo.alias
        if (alias) {
            for (const key in alias) {
                const regexp = new RegExp(key)
                if (regexp.test(moduleName)) {
                    return require(path.join(currentPath, moduleName.replace(regexp, alias[key])))
                }
            }
        }
        return require(moduleName)
    }
}

const getPackageInfo = dirname => {
    const packagePath = `${dirname}${path.sep}package.json`
    if (fs.existsSync(packagePath)) {
        return require(packagePath)
    } else {
        const lastCharIndex = dirname.lastIndexOf(path.sep)
        return getPackageInfo(dirname.substr(0, lastCharIndex))
    }
}
