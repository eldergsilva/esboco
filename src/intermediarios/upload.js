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

const deleteImage = async (path, buffer, mimetype, imgDelete) => {
    const params = {
        Bucket: process.env.BUCKET,
        Key: path,
        Body: buffer,
        ContentType: mimetype,
    };

    try {
        await s3.deleteObject(params).promise();
        console.log(`Imagem excluída com sucesso: ${imgDelete}`);
    } catch (error) {
        console.error(`Erro ao excluir imagem: ${imgDelete}`, error);
        throw error;
    }
};

module.exports = {
    enviarImagem,
    deleteImage
}