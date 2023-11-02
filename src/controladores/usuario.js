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

module.exports = {
    cadastrarUsuario,


}