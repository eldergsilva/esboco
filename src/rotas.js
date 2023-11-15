const express = require('express');
const { cadastrarUsuario, atualizarPerfilDoUsuario, detalharUsuario } = require('./controladores/usuario');
const loginSchema = require('./validacao/loginSchema');
const validarRequisicao = require('./intermediarios/validarRequisicao');
const listarCategorias = require('./controladores/categorias')
const usuarioSchema = require('./validacao/usuario');
const { login } = require('./controladores/login');
const { filtroLogin } = require('./intermediarios/filtroLogin');
const { cadastrarProduto, atualizarProduto, listarProdutos, detalharProduto, listarProduto, deletarProduto } = require('./controladores/produtos');
const { listarClientes, cadastrarCliente, editarDadosDoCliente, detalharCliente } = require('./controladores/clientes');
const clienteSchema = require('./validacao/cliente');

const rotas = express()

rotas.post('/usuario', validarRequisicao(usuarioSchema), cadastrarUsuario)
rotas.post('/login', validarRequisicao(loginSchema), login)
rotas.get('/categorias', listarCategorias)


rotas.use(filtroLogin)
rotas.put('/usuario/:id', validarRequisicao(usuarioSchema), atualizarPerfilDoUsuario)
rotas.get('/usuario', detalharUsuario)
rotas.post('/produto', cadastrarProduto)
rotas.put('/produto/:id', atualizarProduto)
rotas.get('/produto', listarProduto)
rotas.get('/produto/:id', detalharProduto)

rotas.delete('/produto/:id', deletarProduto)
rotas.get('/clientes', listarClientes)
rotas.post('/cliente', validarRequisicao(clienteSchema), cadastrarCliente)
rotas.put('/cliente/:id', validarRequisicao(clienteSchema), editarDadosDoCliente)
rotas.get('/cliente/:id', detalharCliente)

module.exports = rotas