const express = require('express');
const { cadastrarUsuario, atualizarPerfilDoUsuario, detalharUsuario } = require('./controladores/usuario');
const loginSchema = require('./validacao/loginSchema');
const validarRequisicao = require('./intermediarios/validarRequisicao');
const listarCategorias = require('./controladores/categorias')
const usuarioSchema = require('./validacao/usuario');
const { login } = require('./controladores/login');
const { filtroLogin } = require('./intermediarios/filtroLogin');

const rotas = express()

rotas.post('/usuario', validarRequisicao(usuarioSchema), cadastrarUsuario)
rotas.post('/login', validarRequisicao(loginSchema), login)
rotas.put('/usuario/:id', validarRequisicao(usuarioSchema), atualizarPerfilDoUsuario)
rotas.get('/categorias', listarCategorias)

rotas.use(filtroLogin)
rotas.get('/usuario', detalharUsuario)



module.exports = rotas