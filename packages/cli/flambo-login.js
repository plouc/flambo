const program  = require('commander')
const request  = require('request-promise-native')

const spawn    = require('child_process').spawn


program
    .arguments('<login> <password>')
    .action((login, password) => {
        console.log(login, password)

        request({
            method: 'POST',
            uri:    `http://localhost:7000/api/v1/login`,
            json:   { login, password },
        })
            .then(res => {
                console.log(res)
                spawn(process.env.SHELL, {
                    env:   {
                        FLAMBO_TOKEN: res.token,
                    },
                    stdio: 'inherit',
                })
            })
            .catch(error => {
                console.error(error)
            })

    })
    .parse(process.argv)

