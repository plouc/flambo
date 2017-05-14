const crypto   = require('crypto')
const path     = require('path')
const fs       = require('fs')

const busboy   = require('koa-busboy')
const compose  = require('koa-compose')
const Joi      = require('joi')
const mime     = require('mime-types')


const generateFilename = ({ mimetype }) => new Promise((resolve, reject) => {
    crypto.pseudoRandomBytes(16, (error, raw) => {
        if (error) return reject(error)

        resolve(`${raw.toString('hex')}.${mime.extension(mimetype)}`)
    })
})

const getFileSchema = (fieldname) => {
    return Joi.object().keys({
        fieldname: Joi.string().valid(fieldname).required(),
        mimetype:  Joi.string().required(),
    })
}

const moveFile = (file, filename) => new Promise((resolve, reject) => {
    const finalPath = path.join('static', filename)
    const outStream = fs.createWriteStream(finalPath)

    file.pipe(outStream)
    outStream.on('error', reject)
    outStream.on('finish', () => {
        resolve({
            filename: file.filename,
            mimetype: file.mimetype,
            path:     filename,
            //size:     outStream.bytesWritten,
        })
    })
})

exports.single = (fieldname, options) => {
    const parse = busboy({
        limits: {
            fields: 0,
            files:  1,
        },
    })

    const validate = async (ctx, next) => {
        const { error: validationError } = Joi.validate(ctx.request.files, Joi.array().items(
            getFileSchema(fieldname).required()
        ).label('files'), { stripUnknown: true })

        if (validationError) {
            ctx.response.status = 400
            ctx.response.body   = validationError
            return
        }

        ctx.state.upload = ctx.request.files[0]

        await next()
    }

    const store = async (ctx, next) => {
        const { upload } = ctx.state

        const tmpFilename = await generateFilename(upload)
        const saved = await moveFile(upload, tmpFilename)

        ctx.state.upload = saved

        await next()
    }

    return compose([parse, validate, store])
}