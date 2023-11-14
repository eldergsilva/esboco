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
    cep: joi.string().length(8).required().messages({
        'any.required': 'O campo cep é obrigatorio',
        'string.empty': 'O Campo cep é obrigatorio',
        'string.length':'O cep precisa ter 8 digitos'

    }),
    rua: joi.string().required().messages({
        'any.required': 'O campo rua é obrigatorio',
        'string.empty': 'O Campo rua é obrigatorio'
    }),
    numero: joi.string().required().messages({
        'any.required': 'O campo numero é obrigatorio',
        'string.empty': 'O Campo numero é obrigatorio'
    }),
    bairro: joi.string().required().messages({
        'any.required': 'O campo bairro é obrigatorio',
        'string.empty': 'O Campo bairro é obrigatorio'
    })
    ,
    cidade: joi.string().required().messages({
        'any.required': 'O campo cidade é obrigatorio',
        'string.empty': 'O Campo cidade é obrigatorio'
    }) ,
    estado: joi.string().required().messages({
        'any.required': 'O campo estado é obrigatorio',
        'string.empty': 'O Campo estado é obrigatorio'
    })
})
module.exports = clienteSchema