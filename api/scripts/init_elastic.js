const chalk    = require('chalk')
const config   = require('../src/core/config')
const elastic  = require('../src/core/elastic')
const mappings = require('../src/core/elastic/mappings')


console.log(chalk.yellow('creating index…'))
elastic.indices.delete({
    index: config.get('elastic.index'),
})
    // ignoring error if index does not exist
    .catch(() => {})
    .then(() => elastic.indices.create({
        index: config.get('elastic.index'),
    }))
    .then(() => {
        console.log(chalk.green('index created'))

        console.log(chalk.yellow('creating mappings'))
        return elastic.indices.putMapping({
            index: config.get('elastic.index'),
            type:  'item',
            body:  mappings.item,
        })
    })
    .catch(error => {
        console.error(chalk.red('an error occurred'))
        console.error(error)
    })


/*
const getMapping = () => new Promise((resolve, reject) => {
    es.indices.getMapping({
        index: 'flambo',
    }, (err, res) => {
        if (err) {
            reject(err)
        } else {
            resolve(res)
        }
    })
})


const putMapping = (type, mapping) => new Promise((resolve, reject) => {
    es.indices.putMapping({
        index: 'flambo',
        type,
        body:  mapping,
    }, (err, res) => {
        if (err) {
            reject(err)
        } else {
            resolve(res)
        }
    })
})

const createIndex = () => new Promise((resolve, reject) => {
    es.indices.create({
        index: 'flambo',
    }, (err, res) => {
        if (err) {
            reject(err)
        } else {
            resolve(res)
        }
    });
})

createIndex()
    .then(res => {
        console.log(res)

        return putMapping('news_item', newsItemMapping)
    })
    .then(res => {
        console.log(res)

        return getMapping()
    })
    .then(res => {
        console.log(util.inspect(res.flambo.mappings, {
            depth:  null,
            colors: true,
        }));
    })
    .catch(err => {
        console.error(err)
    })
*/
