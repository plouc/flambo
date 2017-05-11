const program  = require('commander')
const request  = require('request-promise-native')

const spawn    = require('child_process').spawn


program
    .parse(process.argv)

request({
    uri:     'http://localhost:7000/api/v1/users',
    headers: {
        Authorization: `Bearer ${process.env.FLAMBO_TOKEN}`,
    }
})
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err)
    })
