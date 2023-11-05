const knex = require('../conexao')
const bcrypt = require('bcrypt');
const usuarioSchema = require('../validacao/usuario');

const cadastrarUsuario = async (req, res) => {
    const {
        nome,
        email,
        senha
    } = req.body;


    try {
        await usuarioSchema.validateAsync(req.body)
        const usuarioEncontrado = await knex('usuarios')
            .where({ email }).first();

        if (usuarioEncontrado) {
            return res.status(400).json({ mensagem: "O email já existe" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios')
            .insert({
                nome,
                email,
                senha: senhaCriptografada
            }).returning('*');
        const { senha: _, ...usuarioCadastrado } = usuario[0]
        if (!usuario) {
            return res
                .status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(201).json(usuarioCadastrado);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

const atualizarPerfilDoUsuario = async (req, res) => {
    const { id } = req.usuario;
    const { nome, email, senha } = req.body;

    try {
        await usuarioSchema.validateAsync({ nome, email, senha });

        const usuarioExistente = await knex('usuarios').whereNot('id', id).where('email', email).first();

        if (usuarioExistente) {
            return res.status(400).json({ mensagem: 'O email já está em uso por outro usuário.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuarioAtualizado = await knex('usuarios')
            .where('id', id)
            .update({ nome, email, senha: senhaCriptografada });

        if (usuarioAtualizado === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        return res.status(200).json({ mensagem: 'Perfil do usuário atualizado com sucesso.' });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

const detalharUsuario = async (req, res) => {
    try {
      const usuarioAutenticado = req.usuario;
  
      const { senha: _, ...detalhesUsuario } = usuarioAutenticado;
  
      return res.status(200).json(detalhesUsuario);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  };

module.exports = {
    cadastrarUsuario,
    atualizarPerfilDoUsuario,
    detalharUsuario,
}