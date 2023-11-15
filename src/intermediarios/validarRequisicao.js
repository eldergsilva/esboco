
const validarRequisicao = (schema) => async (req, res, next) => {

    console.log('ok')
    try {
        await schema.validateAsync(req.body)
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensagem: error.message
        })
    }
}
module.exports = validarRequisicao