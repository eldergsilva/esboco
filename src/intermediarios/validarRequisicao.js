
<<<<<<< HEAD
const validarRequisicao = (schema) => async (req, res, next) => {    
     
=======
const validarRequisicao = (schema) => async (req, res, next) => {

    console.log('ok')
>>>>>>> 03fc4676be9126f83504b1c09eac014071170758
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