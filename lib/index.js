/**
 * Created by Xinyi on 2018/7/2.
 */

const fs = require('fs')
const path = require('path')
const assert = require('assert')

const findUp = (dirname, filename = 'package.json') => {
    const filepath = `${dirname}${path.sep}${filename}`
    if (fs.existsSync(filepath))
        return filepath
    return findUp(dirname.substr(0, dirname.lastIndexOf(path.sep)))
}

module.exports = global.require2 = function (request, packageDir) {
    assert(typeof request === 'string', 'path must be a string')

    const packagePath = packageDir || findUp(path.dirname(module.parent.filename))
    assert(packagePath, 'can\'t find moudle')

    const packageInfo = require(packagePath)
    const alias = packageInfo.alias

    let targetName = request

    if (alias) {
        let filename = path.resolve(path.dirname(packagePath), targetName)
        for (const key in alias) {
            const regexp = new RegExp(key)
            if (regexp.test(filename))
                targetName = path.normalize(filename.replace(regexp, alias[key]))
        }
    }

    if (/\.json$/gm.test(targetName)) {
        const env = process.env.NODE_ENV
        const envMap = packageInfo.envmap
        let filename = path.resolve(path.dirname(packagePath), targetName)
        let newFilename = ''
        if (env && envMap)
            newFilename = filename.replace(/\.json$/gm, `.${envMap[env] || env}.json`)
        if (fs.existsSync(newFilename))
            filename = newFilename
        targetName = filename

    }

    return require(targetName)
}
