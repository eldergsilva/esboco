const knex = require('../conexao')

const bcrypt = require('bcrypt');
const clienteSchema = require('../validacao/cliente');

const cadastrarCliente = async (req, res) => {
    const {
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
    } = req.body;

    try {
         
        
        
        const clienteEncontrado = await knex('clientes').where({ email }).first();
        if (clienteEncontrado) {
            return res.status(400).json({ mensagem: "O email já existe" });
        }
        
        const cliente = await knex('clientes').insert({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }).returning('*');

        const [clienteCadastrado] = cliente;

        if (!clienteCadastrado) {
            return res.status(400).json({ mensagem: "O cliente não foi cadastrado." });
        }
         
        return res.status(201).json(clienteCadastrado);
    } catch (error) {
        
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const editarDadosDoCliente = async (req, res) => {
     
    const { id } = req.params;
    const {
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
    } = req.body;

    try {

        
        

        const clienteExistente = await knex('clientes').whereNot('id', id).where('email', email).first();

        if (clienteExistente) {
            return res.status(400).json({ mensagem: 'O email já está em uso por outro cliente.' });
        }

        const clienteAtualizado = await knex('clientes')
            .where('id', id)
            .update({
                nome,
                email,
                cpf,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                estado
            });

        if (clienteAtualizado === 0) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
        }

        return res.status(200).json({ mensagem: 'Dados do cliente atualizados com sucesso.' });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex('clientes').select('*');
        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(400).json({ erro: 'Erro ao listar clientes', mensagem: error.message });
    }
};

module.exports = {
    cadastrarCliente,
    editarDadosDoCliente,
    listarClientes,
};