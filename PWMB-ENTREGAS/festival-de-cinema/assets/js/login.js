const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const mysql = require('mysql');

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost', // Host do banco de dados
  port: 3306, // Porta do banco de dados
  user: 'root', // Usuário do banco de dados
  password: 'p@$$w0rd', // Senha do banco de dados
  database: 'cinema' // Nome do banco de dados
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

// Rota para lidar com o login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Consulta ao banco de dados para verificar se o usuário existe
  const query = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;
  connection.query(query, [email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      res.status(500).send('Erro interno do servidor');
      return;
    }

    if (results.length > 0) {
      // Usuário encontrado, login bem-sucedido
      req.session.loggedin = true; // Marca o usuário como autenticado
      res.redirect('/painel-administracao');
    } else {
      // Usuário não encontrado, login inválido
      res.status(401).send('Credenciais inválidas');
    }
  });
});

// Rota para o painel de administração
app.get('/painel-administracao', (req, res) => {
  // Verifica se o usuário está autenticado
  if (req.session.loggedin) {
    // O usuário está autenticado, permite o acesso ao painel de administração
    res.send('Bem-vindo ao painel de administração!');
  } else {
    // O usuário não está autenticado, redireciona para a página de login
    res.redirect('/login');
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});