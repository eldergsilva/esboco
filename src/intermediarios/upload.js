const aws = require('aws-sdk')

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY,
    },
})

const enviarImagem = async (path, buffer, mimetype) => {
    const arquivo = await s3
        .upload({
            Bucket: process.env.BUCKET,
            Key: path,
            Body: buffer,
            ContentType: mimetype,
        })
        .promise()

    return {
        path: arquivo.Key,
        url: `https://${process.env.BUCKET}.${process.env.ENDPOINT_S3}/${arquivo.Key}`,
    }
}

module.exports = {
    enviarImagem
}