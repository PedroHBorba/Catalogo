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
    database: 'catalogo_produtos'
});

// Conector ao banco de dados
connection.conect(error => {
    if (error) {
        console.error('Erro ao conectar ao seu banco de dados: ' + error.stack)
        return;
    }
    console.log('Conectado ao seu banco de dados' + connection.threadId);

});

// Endpoint para adicionar um usuario (Post)

app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    connection.query(sql, [nome, email, senha], (error, results) => {
        if (error) {
            res.status(500).send('Error ao adicionar este usuario');
            return;
        }
        res.status(201).send('Usuario adicionado com sucesso');
    });
});

// ENDPOINT para pegar todos os usuarios (Get)
app.get('/usuarios/:id', (req, res) => {
    connection.query('SELECT * FROM usuarios', (error, results) => {
        if (error) {
            res.status(500).send('Erro ao obter usuario.');
            return;
        }
        res.json(results);

    });
});

// Endpoint para obter um usuario po ID (Get)
app.get('/usuarios/:id', (req, res) => {
    const {id} = req.params;
    connection.query('SLECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
        if (error) {
            resstatus(500).send('Erro ao obter usuario.');
            return;
        }
        res.json(results[0]);
    });
});
// Endpoint para atualizar um usuário (PUT)
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
    connection.query(sql, [nome, email, senha, id], (error, results) => {
      if (error) {
        res.status(500).send('Erro ao atualizar usuário.');
        return;
      }
      res.send('Usuário atualizado com sucesso.');
    });
  });
  
  // Endpoint para deletar um usuário (DELETE)
  app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
      if (error) {
        res.status(500).send('Erro ao deletar usuário.');
        return;
      }
      res.send('Usuário deletado com sucesso.');
    });
  });
  
  // Iniciar o servidor
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });