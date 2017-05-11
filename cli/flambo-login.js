const program  = require('commander')
const request  = require('request-promise-native')

const spawn    = require('child_process').spawn


program
    //.arguments('[name]')
    .action(() => {
        console.log('hey')

        spawn(process.env.SHELL, {
            env:   {
                crap: 'of course',
            },
            stdio: 'inherit',
        })

        /*
        request('http://localhost:7000/api/v1/groups')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })

        /*
        let version

        // issues with wildcard expansion
        if (name === 'wildcard') {
            name = '*'
        }

        api.newDomainVersion()
            .then(_version => {
                version = _version
                console.log(`created new version: ${version}`)
            })
            .then(() => api.addRecord(version, { name, type, value }))
            .then(record => {
                console.log('added record:')
                console.log(columnify(record))

                return api.updateDomainVersion(version)
            })
            .catch(console.error)
            */
    })
    .parse(process.argv)

