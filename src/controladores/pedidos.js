const knex = require('../conexao');

const listarPedidos = async (req, res) => {
    try {
        const pedidos = await knex('pedidos')
            .select('*');

        return res.status(200).json(pedidos);
    } catch (error) {
        return res.status(400).json({ erro: 'Erro ao listar pedidos', mensagem: error.message });
    }
}

module.exports = {
    listarPedidos
};
