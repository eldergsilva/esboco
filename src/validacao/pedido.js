const Joi = require('joi');

const pedidoSchema = Joi.object({
  cliente_id: Joi.number().integer().positive().required().messages({
    'any.required': 'O campo cliente_id é obrigatório',
    'number.base': 'O campo cliente_id deve ser um número inteiro positivo',
  }),
  observacao: Joi.string().allow('').optional(),
  pedido_produtos: Joi.array().min(1).items(
    Joi.object({
      produto_id: Joi.number().integer().positive().required().messages({
        'any.required': 'O campo produto_id é obrigatório',
        'number.base': 'O campo produto_id deve ser um número inteiro positivo',
      }),
      quantidade_produto: Joi.number().integer().positive().required().messages({
        'any.required': 'O campo quantidade_produto é obrigatório',
        'number.base': 'O campo quantidade_produto deve ser um número inteiro positivo',
      }),
    })
  ).required().messages({
    'any.required': 'O campo pedido_produtos é obrigatório',
    'array.min': 'Deve haver pelo menos um produto no pedido',
  }),
});

module.exports = pedidoSchema