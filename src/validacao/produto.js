const joi = require('joi')

const produtoSchema = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descriçao é obrigatorio',
        'string.empty': 'O Campo descriçao é obrigatorio'
    }),
    quantidade_estoque: joi.number().required().messages({
        'any.required': 'O campo quantidade_estoaque  é obrigatorio',
        'string.empty': 'O Campo quantidade_estoaque é obrigatorio',
        'string.base': 'O Campo quantidade_estoaque é obrigatorio'
    }),
    valor: joi.string().required().messages({
        'any.required': 'O campo valor é obrigatorio',
        'string.empty': 'O Campo valor é obrigatorio'
    }),
    categoria_id: joi.number().required().messages({
        'any.required': 'O campo categoria_id é obrigatorio',
        'string.empty': 'O Campo categoria_id é obrigatorio',
    })
})
module.exports = {
    produtoSchema
}