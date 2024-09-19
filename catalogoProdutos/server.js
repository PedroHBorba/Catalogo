const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passoword: '', // senha vaxzia
    database : 'catalogo_produtos'
});

// Conector ao banco de dados
connection.conect(error =>{
    if(error) {
        console.error('Erro ao conectar ao seu banco de dados: ' + error.stack)
        return;
    }
    console.log('Conectado ao seu banco de dados' + connection.threadId);

});

// Endpoint para adicionar usuarios (Post)

app.post('/usuarios' , (req, res) => {
    const {nome, email, senha } = req.body;
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    connection.query(sql, [nome, email, senha], (error, results) => {
        if (error) {
            res.status(500).send('Error ao adicionar este usuario');
            return;
        }
        res.status(201.send)('Usuario adicionado com sucesso');
    });
});

// ENDPOINT para pegar o ID do usuario (get)
app.get('/usuarios/:id', (req, res) => {
    const { id }  = req.params;
});