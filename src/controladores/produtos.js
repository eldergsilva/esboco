const knex = require('../conexao')
const { enviarImagem, deleteImage } = require('../intermediarios/upload')
const { produtoSchema } = require('../validacao/produto')

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = req.body
    const { originalname, mimetype, buffer } = req.file

    try {
        await produtoSchema.validateAsync(req.body)

        let produto = await knex('produtos')
            .insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
            })
            .returning('*')

        if (!produto[0]) {
            return res.status(400).json('O produto não foi cadastrado')
        }
        if (quantidade_estoque < 0) {
            return res.status(400).json({ mensagem: 'A quantidade nao pode ser numero negativo' })
        }
        if (valor < 1) {
            return res.status(400).json({ mensagem: 'O valor nao pode ser numero negativo' })
        }
        const id = produto[0].id

        const produto_imagem = await enviarImagem(
            `produtos/${id}/${originalname}`,
            buffer,
            mimetype
        )

        produto = await knex('produtos').update({
            produto_imagem: produto_imagem.path
        }).where({ id }).returning('*')

        produto[0].urlImagem = produto_imagem.url

        return res.status(200).json(produto[0])
    } catch (error) {
        console.log(error)
        return res.status(400).json({ mesagem: 'error interno no servidor' })
    }
}

const atualizarProduto = async (req, res) => {
    const { id } = req.params
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

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

        return res.status(204).json('produto foi atualizado com sucesso.')
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
            return res.status(400).json({ erro: 'Produto não encontrado', id_produto: id });
        }

        return res.status(200).json(produto);
    } catch (error) {
        return res.status(400).json({ erro: 'Erro ao detalhar produto', mensagem: error.message });
    }
}

const deletarProduto = async (req, res) => {
    const { id } = req.params;
    try {
        // Verificar se tem algum prodito com pedido
        const produtoEmPedido = await knex('pedido_produto').where({ id_produto: id }).first();
    
        if (produtoEmPedido) {
          return res.status(400).json({ erro: 'Produto não pode ser excluído, pois está associado a um pedido.' });
        }
    try {
        const produto = await knex('produtos')
            .where('id', id)
            .first();

        if (!produto) {
            return res.status(400).json({ erro: 'Produto não encontrado', id_produto: id });
        }

        const produtoExcluido = await knex('produtos')
            .where('id', id)
            .del();

        if (!produtoExcluido) {
            return res.status(400).json('O produto não foi excluído');
        }
        await deleteImage(produto.produto_imagem);

        return res.status(204).json('Produto excluído com sucesso.');
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