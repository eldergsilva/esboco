const express = require('express');
const { cadastrarUsuario, atualizarPerfilDoUsuario, detalharUsuario } = require('./controladores/usuario');
const loginSchema = require('./validacao/loginSchema');
const validarRequisicao = require('./intermediarios/validarRequisicao');
const listarCategorias = require('./controladores/categorias')
const usuarioSchema = require('./validacao/usuario');
const { login } = require('./controladores/login');

const rotas = express()

rotas.post('/usuario', validarRequisicao(usuarioSchema), cadastrarUsuario)
rotas.post('/login', validarRequisicao(loginSchema), login)
rotas.put('/usuario', validarRequisicao(loginSchema), atualizarPerfilDoUsuario)
rotas.get('/usuario', validarRequisicao(loginSchema), detalharUsuario)

rotas.get('/categorias', listarCategorias)

module.exports = rotas