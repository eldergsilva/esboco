const knex = require('../conexao');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const hash = process.env.JWT_HASH

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await knex('usuarios').where({ email }).first();

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(400).json({
                mesagem: "Usuario e/ ou senha invalido(s)."
            });
        }

        const token = jwt.sign({ id: usuario.id }, hash, { expiresIn: '8h' });

        const { senha: _, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });
    } catch (error) {
        return res.status(500).json({
            mesagem: 'erro interno do servidor'
        });
    }
}

module.exports = {
    login
}