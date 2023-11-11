const knex = require('../conexao')

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex('clientes').select('*');
        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(400).json({ erro: 'Erro ao listar clientes', mensagem: error.message });
    }
};

module.exports = {
    listarClientes,
};