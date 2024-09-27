const express = require('express');
const app = express();
const port = 3000;

let estoque = [];

app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;
    const produtoExistente = estoque.find(produto => produto.id === id);
    if (produtoExistente) {
        return res.status(400).send(`Produto com ID ${id} já existe.`);
    }
    const novoProduto = {
        id,
        nome,
        qtd: parseInt(qtd),
    };
    estoque.push(novoProduto);
    res.send(`Produto ${nome} adicionado ao estoque.`);
});

app.get('/listar', (req, res) => {
    if (estoque.length === 0) {
        return res.send('O estoque está vazio.');
    }
    res.json(estoque);
});

app.get('/remover/:id', (req, res) => {
    const { id } = req.params;
    const index = estoque.findIndex(produto => produto.id === id);
    if (index === -1) {
        return res.status(404).send(`Produto com ID ${id} não encontrado.`);
    }
    estoque.splice(index, 1);
    res.send(`Produto com ID ${id} foi removido do estoque.`);
});

app.get('/editar/:id/:qtd', (req, res) => {
    const { id, qtd } = req.params;
    const produto = estoque.find(produto => produto.id === id);
    if (!produto) {
        return res.status(404).send(`Produto com ID ${id} não encontrado.`);
    }
    produto.qtd = parseInt(qtd);
    res.send(`Quantidade do produto com ID ${id} atualizada para ${qtd}.`);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
