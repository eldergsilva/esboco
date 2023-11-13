const knex = require('../conexao')

const cadastrarProduto = async (req, res) => {
    const { categorias } = req
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    if (!descricao) {
        return res.status(404).json('O campo descriçâo é obrigatório')
    }

    if (!quantidade_estoque) {
        return res.status(404).json('O campo quantidade de estoque é obrigatório')
    }
    if (!valor) {
        return res.status(404).json('O campo valor é obrigatório')
    }

    try {
        const produto = await knex('produtos')
            .insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            })
            .returning('*')

        if (!produto[0]) {
            return res.status(400).json('O produto não foi cadastrado')
        }

        return res.status(200).json(produto[0])
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
}


const atualizarProduto = async (req, res) => {
    const { categorias } = req
    const { id } = req.params
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    if (!quantidade_estoque && !valor && !descricao && !categoria_id) {
        return res
            .status(404)
            .json('Informe ao menos um campo para atualizaçao do produto')
    }

    try {
        const produto = await knex('produtos')
            .where({
                id,
                categoria_id: categoria_id,
            })
            .first()

        if (!produto) {
            return res.status(404).json('Produto não encontrado')
        }

        const produtoAtualizado = await knex('produtos')
            .where({
                id: produto.id,
                categoria_id: categoria_id,
            })
            .update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            })

        if (!produtoAtualizado) {
            return res.status(400).json('O produto não foi atualizado')
        }

        return res.status(200).json('produto foi atualizado com sucesso.')
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
}

const listarProduto = async (req, res) => {
    const { categoria } = req.query;

    try {
        const produtos = await knex('produtos')
            .where(query => {
                if (categoria) {
                    return query.where('categoria_id', 'ilike', `%${categoria}%`);
                }
            })
         
        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(400).json({ erro: 'Erro ao listar produtos', mensagem: error.message });
    }
}

const detalharProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await knex('produtos').where({
            id,
        }).first();

        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado', id_produto: id });
        }

        return res.status(200).json(produto);
    } catch (error) {
        return res.status(400).json({ erro: 'Erro ao detalhar produto', mensagem: error.message });
    }
}

const deletarProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await knex('produtos')
            .where('id', id)
            .first();

        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado', id_produto: id });
        }

        const produtoExcluido = await knex('produtos')
            .where('id', id)
            .del();

        if (!produtoExcluido) {
            return res.status(400).json('O produto não foi excluído');
        }

        return res.status(200).json('Produto excluído com sucesso.');
    } catch (error) {
        return res.status(400).json({ erro: 'Erro ao excluir produto', mensagem: error.message });
    }
}
module.exports = {
    cadastrarProduto,
    atualizarProduto,
    listarProduto,
    detalharProduto,
    deletarProduto
}