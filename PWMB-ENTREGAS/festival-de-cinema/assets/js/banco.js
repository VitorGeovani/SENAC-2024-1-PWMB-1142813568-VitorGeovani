const mysql = require('mysql');

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Substitua pelo seu usuário do MySQL
    password: 'p@$$w0rd', // Substitua pela sua senha do MySQL
    port: 3306           // Especifique a porta, se for diferente da padrão, altere este valor
});

// Conecta ao MySQL
connection.connect((err) => {
    if (err) {
        return console.error('Erro ao conectar ao MySQL:', err.message);
    }

    // Cria o banco de dados se não existir
    connection.query('CREATE DATABASE IF NOT EXISTS cinemaproject', (err, result) => {
        if (err) {
            console.error('Erro ao criar o banco de dados:', err.message);
            return connection.end();
        }

        // Seleciona o banco de dados
        connection.query('USE cinemaproject', (err, result) => {
            if (err) {
                console.error('Erro ao selecionar o banco de dados:', err.message);
                return connection.end();
            }

            // Função para criar tabelas e inserir dados
            const executeQuery = (query, callback) => {
                connection.query(query, (err, result) => {
                    if (err) {
                        console.error('Erro ao executar a query:', err.message);
                        return connection.end();
                    }
                    if (callback) callback();
                });
            };

            // Cria a tabela 'usuarios'
            const createUsuariosTable = `
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(100),
                    senha VARCHAR(100)
                )
            `;
            executeQuery(createUsuariosTable, () => {
                // Insere valores na tabela 'usuarios'
                const insertUsuarios = `
                    INSERT INTO usuarios (email, senha) VALUES 
                    ('admin1@gmail.com', '123'),
                    ('admin2@gmail.com', '123')
                `;
                executeQuery(insertUsuarios);
            });

            // Cria a tabela 'filmes'
            const createFilmesTable = `
                CREATE TABLE IF NOT EXISTS filmes (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    capa VARCHAR(255),
                    titulo VARCHAR(255) NOT NULL,
                    diretor VARCHAR(255) NOT NULL,
                    genero VARCHAR(100),
                    duracao INT,
                    data_lancamento VARCHAR(50),
                    sinopse TEXT,
                    classificacao_indicativa VARCHAR(50)
                )
            `;
            executeQuery(createFilmesTable);

            // Cria a tabela 'filmes_avaliacao'
            const createFilmesAvaliacaoTable = `
                CREATE TABLE IF NOT EXISTS filmes_avaliacao (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    capa VARCHAR(255),
                    titulo VARCHAR(255),
                    diretor VARCHAR(255),
                    genero VARCHAR(100),
                    duracao INT,
                    data_lancamento VARCHAR(50),
                    classificacao_indicativa VARCHAR(50),
                    cinematografia VARCHAR(100),
                    originalidade VARCHAR(100),
                    comentario_tecnico TEXT
                )
            `;
            executeQuery(createFilmesAvaliacaoTable);

            // Cria a tabela 'programacao'
            const createProgramacaoTable = `
                CREATE TABLE IF NOT EXISTS programacao (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    capa VARCHAR(255),
                    titulo VARCHAR(255),
                    diretor VARCHAR(100),
                    data VARCHAR(50),
                    horario VARCHAR(50),
                    local VARCHAR(255)
                )
            `;
            executeQuery(createProgramacaoTable);

            // Cria a tabela 'eventos'
            const createEventosTable = `
                CREATE TABLE IF NOT EXISTS eventos (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    capa VARCHAR(255),
                    nome VARCHAR(255),
                    data VARCHAR(50),
                    hora VARCHAR(50),
                    local VARCHAR(255),
                    descricao TEXT
                )
            `;
            executeQuery(createEventosTable);

            // Cria a tabela 'ingressos'
            const createIngressosTable = `
                CREATE TABLE IF NOT EXISTS ingressos (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    capa VARCHAR(255),
                    nome VARCHAR(255),
                    diretor VARCHAR(100),
                    data VARCHAR(50),
                    hora VARCHAR(50),
                    local VARCHAR(255),
                    vagas INT
                )
            `;
            executeQuery(createIngressosTable);

            // Cria a tabela 'compras_finalizadas'
            const createComprasFinalizadasTable = `
                CREATE TABLE IF NOT EXISTS compras_finalizadas (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    usuario_id INT,
                    ingresso_id INT,
                    quantidade INT,
                    data_compra DATETIME,
                    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
                    FOREIGN KEY (ingresso_id) REFERENCES ingressos(id)
                )
            `;
            executeQuery(createComprasFinalizadasTable, () => {
                // Fecha a conexão após todas as operações serem concluídas
                connection.end();
            });
        });
    });
});
