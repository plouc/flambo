'use strict'

const fs   = require('fs')
const yaml = require('js-yaml')


const loadYamlFile = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, rawData) => {
            if (err) {
                return reject(err)
            }

            try {
                const data = yaml.safeLoad(rawData, {
                    filename: file,
                })

                resolve(data)
            } catch (err) {
                reject(err)
            }
        });
    })
}


module.exports.loadYamlFile = loadYamlFile
