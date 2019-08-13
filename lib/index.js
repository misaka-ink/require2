/**
 * Created by Xinyi on 2018/7/2.
 */

const fs = require('fs')
const path = require('path')
const assert = require('assert')

const findUp = (dirname, filename) => {
    const filepath = `${dirname}${path.sep}${filename}`
    if (fs.existsSync(filepath))
        return filepath
    return findUp(dirname.substr(0, dirname.lastIndexOf(path.sep)))
}

module.exports = global.require2 = function (request) {
    assert(typeof request === 'string', 'path must be a string')

    const packagePath = findUp(path.dirname(module.parent.filename), 'package.json')
    const packageInfo = require(packagePath)
    const alias = packageInfo.alias

    let filename = path.resolve(path.dirname(module.parent.filename), request),
        newFilename = filename

    if (alias) {
        for (const key in alias) {
            const regexp = new RegExp(key)
            if (regexp.test(newFilename))
                newFilename = newFilename.replace(regexp, alias[key])
        }
    }

    if (/\.json$/gm.test(newFilename)) {
        const env = process.env.NODE_ENV
        const envMap = packageInfo.envmap

        if (env && envMap)
            newFilename = newFilename.replace(/\.json$/gm, `.${envMap[env] || env}.json`)
    }

    if (fs.existsSync(newFilename)) {
        return require(newFilename)
    }
    return require(filename)
}