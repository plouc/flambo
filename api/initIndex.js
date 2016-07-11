const util      = require('util');
const dotenv    = require('dotenv');
dotenv.config({ silent: true });
const container = require('./src/container');

const newsItemMapping = require('./elastic/mappings/news_item');

const es = container.get('elastic');

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
