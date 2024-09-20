
const express = require('express');
const app = express();
const calculadora = require('./util/calculadora');

const parseParams = (a, b) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB)) {
        return { error: 'Os parâmetros devem ser números válidos' };
    }
    return { numA, numB };
};

app.get('/somar/:a/:b', (req, res) => {
    const { numA, numB, error } = parseParams(req.params.a, req.params.b);
    if (error) {
        return res.status(400).send(error);
    }
    const resultado = calculadora.somar(numA, numB);
    res.send(`Resultado da soma: ${resultado}`);
});

app.get('/subtrair/:a/:b', (req, res) => {
    const { numA, numB, error } = parseParams(req.params.a, req.params.b);
    if (error) {
        return res.status(400).send(error);
    }
    const resultado = calculadora.subtrair(numA, numB);
    res.send(`Resultado da subtração: ${resultado}`);
});

app.get('/multiplicar/:a/:b', (req, res) => {
    const { numA, numB, error } = parseParams(req.params.a, req.params.b);
    if (error) {
        return res.status(400).send(error);
    }
    const resultado = calculadora.multiplicar(numA, numB);
    res.send(`Resultado da multiplicação: ${resultado}`);
});

app.get('/dividir/:a/:b', (req, res) => {
    const { numA, numB, error } = parseParams(req.params.a, req.params.b);
    if (error) {
        return res.status(400).send(error);
    }
    const resultado = calculadora.dividir(numA, numB);
    res.send(`Resultado da divisão: ${resultado}`);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
