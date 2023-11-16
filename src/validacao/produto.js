const joi = require('joi')

const produtoSchema = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descriçao é obrigatorio',
        'string.empty': 'O Campo descriçao é obrigatorio'
    }),
    quantidade_estoque: joi.number().required().messages({
        'any.required': 'O campo quantidade_estoaque  é obrigatorio',
        'string.empty': 'O Campo quantidade_estoaque é obrigatorio',
        'string.base': 'O Campo quantidade_estoaque é obrigatorio',
        'number.base': 'voce precisa inserir numero'
    }),
    valor: joi.number().required().messages({
        'any.required': 'O campo valor é obrigatorio',
        'string.empty': 'O Campo valor é obrigatorio',
        'string.base': 'O Campo valor é obrigatorio',
        'number.base': 'voce precisa inserir numero'
    }),
    categoria_id: joi.number().required().messages({
        'any.required': 'O campo categoria_id é obrigatorio',
        'string.empty': 'O Campo categoria_id é obrigatorio',
        'string.base': 'O Campo categoria_id é obrigatorio',
        'number.base': 'voce precisa inserir numero'
    })
})
module.exports = {
    produtoSchema
}