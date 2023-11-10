const express = require('express');
const { cadastrarUsuario, atualizarPerfilDoUsuario, detalharUsuario } = require('./controladores/usuario');
const loginSchema = require('./validacao/loginSchema');
const validarRequisicao = require('./intermediarios/validarRequisicao');
const listarCategorias = require('./controladores/categorias')
const usuarioSchema = require('./validacao/usuario');
const { login } = require('./controladores/login');
const { filtroLogin } = require('./intermediarios/filtroLogin');
const { cadastrarProduto, atualizarProduto } = require('./controladores/produtos');

const rotas = express()

rotas.post('/usuario', validarRequisicao(usuarioSchema), cadastrarUsuario)
rotas.post('/login', validarRequisicao(loginSchema), login)
rotas.get('/categorias', listarCategorias)



rotas.use(filtroLogin)
rotas.put('/usuario/:id', validarRequisicao(usuarioSchema), atualizarPerfilDoUsuario)
rotas.get('/usuario', detalharUsuario)
rotas.post('/produto', cadastrarProduto)
rotas.put('/produto/:id', atualizarProduto)




module.exports = rotas