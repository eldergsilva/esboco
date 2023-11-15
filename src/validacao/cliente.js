const joi = require('joi')

const clienteSchema = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatorio',
        'string.empty': 'O Campo nome é obrigatorio'
    }).options({ stripUnknown: true })
    ,
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatorio',
        'string.empty': 'O Campo email é obrigatorio',
        'string.email': 'O Campo email precisa ter um email válido!'
    }),
    cpf: joi.string().length(11).required().messages({
        'any.required': 'O campo cpf é obrigatorio',
        'string.empty': 'O Campo cpf é obrigatorio',
        'string.length':'O cpf precisa ter 11 digitos'
    }),
    cep: joi.string().optional(),
    rua: joi.string().optional(),
    numero: joi.string().optional(),
    bairro: joi.string().optional(),
    cidade: joi.string().optional(),
    estado: joi.string().optional(),
})
module.exports = clienteSchema