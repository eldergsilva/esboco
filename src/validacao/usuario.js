const joi = require('joi')

const usuarioSchema = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatorio',
        'string.empty': 'O Campo nome é obrigatorio'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatorio',
        'string.empty': 'O Campo email é obrigatorio',
        'string.email': 'O Campo email precisa ter um email válido!'
    }),
    senha: joi.string().required().messages({
        'any.required': 'O campo senha é obrigatorio',
        'string.empty': 'O Campo senha é obrigatorio'
    })
})
module.exports = usuarioSchema