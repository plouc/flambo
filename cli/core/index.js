const _          = require('lodash')
const request    = require('request-promise-native')
const prettyjson = require('prettyjson')
const ora        = require('ora')


const paginationOptions = program => {
    return program
        .option('-p, --page <n>', 'page', Number, 1)
        .option('-l, --per-page <n>', 'items per page', Number, 10)
}

exports.collectionCommand = (program, {
    name,
    description,
    path,
}) => {
    const command = program
        .command(name)
        .description(description)

    paginationOptions(command)

    command
        .action(options => {
            const spinner = ora(`loading ${path}`).start()

            request({
                uri:     `http://localhost:7000/api/v1${path}`,
                json:    true,
                qs:      {
                    page:     options.page,
                    per_page: options.perPage,
                },
                headers: {
                    Authorization: `Bearer ${process.env.FLAMBO_TOKEN}`,
                },
            })
                .then(res => {
                    spinner.succeed(`loaded ${path}`)
                    console.log(prettyjson.render(res))
                })
                .catch(err => {
                    console.error(err)
                })
        })
}