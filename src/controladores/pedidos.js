const knex = require('../conexao');
const enviarEmail = require('../intermediarios/nodemailer');

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

    if (!pedido_id) {
      return res.status(500).json({ mensagem: 'Erro ao obter o ID do pedido' });
    }

    const erros = [];

    await Promise.all(pedido_produtos.map(async (produto) => {
      const { produto_id, quantidade_produto } = produto;

      const produtoExistente = await knex('produtos').where('id', produto_id).first();
      if (!produtoExistente) {
        erros.push(`Produto com ID ${produto_id} não encontrado`);
        return;
      }

      if (quantidade_produto > produtoExistente.quantidade_estoque) {
        erros.push(`Quantidade insuficiente em estoque para o produto ${produto_id}`);
      } else {
        await knex('produtos')
          .where('id', produto_id)
          .decrement('quantidade_estoque', quantidade_produto);

        await knex('pedido_produtos').insert({
          pedido_id: pedido_id.id,
          produto_id,
          quantidade_produto,
          valor_produto: 0,
        });
      }
    }));

     const { email: to } = await knex('clientes').where('id', cliente_id).first();
    enviarEmail(to, 'Pedido Cadastrado com Sucesso', 'Seu pedido foi cadastrado com sucesso!');
  console.log(to)
    return res.status(201).json({ mensagem: 'Pedido cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

const listarPedidos = async (req, res) => {
  try {
    const pedidos = await knex('pedidos').select('*');
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(400).json({ erro: 'Erro ao listar pedidos', mensagem: error.message });
  }
};

module.exports = {
  cadastrarPedido,
  listarPedidos,
};