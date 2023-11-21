const knex = require('../conexao')
const cadastrarPedido = async (req, res) => {
  try {
    const { cliente_id, observacao, pedido_produtos } = req.body;

     const clienteExistente = await knex('clientes').where('id', cliente_id).first();
    if (!clienteExistente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }

     const [pedido_id] = await knex('pedidos').insert({
      cliente_id,
      observacao,
      valor_total: 0,  
    }).returning('id');

     for (const produto of pedido_produtos) {
      const produtoExistente = await knex('produtos').where('id', produto.produto_id).first();
      if (!produtoExistente) {
        return res.status(404).json({ mensagem: `Produto com ID ${produto.produto_id} não encontrado` });
      }

       if (produto.quantidade_produto > produtoExistente.quantidade_estoque) {
        return res.status(400).json({ mensagem: `Quantidade insuficiente em estoque para o produto ${produto.produto_id}` });
      }
    }

     await Promise.all(pedido_produtos.map(async (produto) => {
      const { produto_id, quantidade_produto } = produto;

       await knex('produtos')
        .where('id', produto_id)
        .decrement('quantidade_estoque', quantidade_produto);

       await knex('pedido_produtos').insert({
        pedido_id: pedido_id[0],
        produto_id,
        quantidade_produto,
        valor_produto: 0,  
      });
    }));

    return res.status(201).json({ mensagem: 'Pedido cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};


 
const listarPedidos =async (req, res) => {
  try {
    const pedidos = await knex('pedidos').select('*');
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(400).json({ erro: 'Erro ao listar pedidos', mensagem: error.message });
  }
}
module.exports = {
  cadastrarPedido,
  
  listarPedidos
}