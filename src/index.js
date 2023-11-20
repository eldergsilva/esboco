require('dotenv').config();
const express = require('express');
const rotas = require('./rotas');
const app = express();
const aws = require('aws-sdk')

app.use(express.json());
app.use(rotas)
app.listen(process.env.PORT, () => {
    console.log(`Conctado na porta ${process.env.PORT}`)
}); 