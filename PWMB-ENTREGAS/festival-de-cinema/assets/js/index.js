const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');
const multer = require('multer');

const QRCode = require('qrcode');
const { createCanvas } = require('canvas');
const { sendEmails } = require('./emailService');

// Configurações de transporte do Nodemailer
const nodemailer = require('nodemailer');
require('dotenv').config();

const mailConfig = {
    service: 'gmail', // Alterado para 'gmail'
    auth: {
        user: process.env.EMAIL || 'cinemadofestival@gmail.com',
        pass: process.env.PASSWORD || 'skge guqq sxkg wfvy'
    }
};

const transport = nodemailer.createTransport(mailConfig);

// Configuração do Multer para upload de arquivos
let data;
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/Vitor/Meus Documentos/Área de Trabalho/festival-de-cinema-de-gramado-v3.4/uploads');
    },
    filename: function(req, file, cb) {
        data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif' || file.mimetype === 'image/svg' || file.mimetype === 'image/webp')
        cb(null, true);
    else    
        cb(null, false);
};

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//configurando o body parsewr para pegar POSTS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//Iniciando o servidor
app.listen(port);
console.log('API funcionando!');

// Configuração da conexão com o banco de dados MySQL
function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host: 'localhost', // Host do seu banco de dados
        port: 3306, // Porta do seu banco de dados
        user : 'root', // Usuário do seu banco de dados
        password : 'p@$$w0rd', // Senha do seu banco de dados
        database : 'cinema' // Nome do seu banco de dados
    });

    connection.query(sqlQry, function(error, results, fields){
        if(error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}

router.get('/usuarios', (req, res) => {
    execSQLQuery('SELECT * FROM usuarios', res);
});

router.get('/usuarios/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE id=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM usuarios' + filter, res);
});

router.delete('/usuarios/:id', (req, res) => {
    execSQLQuery('DELETE FROM usuarios WHERE id=' + parseInt(req.params.id), res);
});

router.post('/usuarios', (req, res) => {
    const email = req.body.email.substring(0, 100);
    const senha = req.body.senha.substring(0, 100);
    execSQLQuery(`INSERT INTO usuarios(email, senha) VALUES('${email}', '${senha}')`, res);
});

router.patch('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const email = req.body.email.substring(0, 100);
    const senha = req.body.senha.substring(0, 100);
    execSQLQuery(`UPDATE usuarios SET email='${email}', senha='${senha}' WHERE id=${id}`, res);
});

// Rotas para filmes
// router.post('/filmes', (req, res) => {
//     const capa = req.body.capa;
//     const titulo = req.body.titulo.substring(0, 255);
//     const diretor = req.body.diretor.substring(0, 255);
//     const genero = req.body.genero.substring(0, 100);
//     const duracao = req.body.duracao;
//     const data_lancamento = req.body.data_lancamento;
//     const sinopse = req.body.sinopse.substring(0, 100);
//     const classificacao_indicativa = req.body.classificacao.substring(0, 50);
//     execSQLQuery(`INSERT INTO filmes(capa, titulo, diretor, genero, duracao,  data_lancamento, sinopse, classificacao_indicativa) VALUES('${capa}','${titulo}', '${diretor}', '${genero}', '${duracao}', '${data_lancamento}', '${sinopse}', '${classificacao_indicativa}')`, res);
// });

router.post('/filmes', upload.single('capa'), (req, res) => {
    console.log(req.file);
    const capa = 'uploads/' + req.file.filename;
    const titulo = req.body.titulo.substring(0, 255);
    const diretor = req.body.diretor.substring(0, 255);
    const genero = req.body.genero.substring(0, 100);
    const duracao = req.body.duracao;
    const data_lancamento = req.body.data_lancamento;
    const sinopse = req.body.sinopse.substring(0, 100);
    const classificacao_indicativa = req.body.classificacao.substring(0, 50);
    execSQLQuery(`INSERT INTO filmes(capa, titulo, diretor, genero, duracao,  data_lancamento, sinopse, classificacao_indicativa) VALUES('${capa}','${titulo}', '${diretor}', '${genero}', '${duracao}', '${data_lancamento}', '${sinopse}', '${classificacao_indicativa}')`, res);
});

router.get('/filmes', (req, res) => {
    execSQLQuery('SELECT * FROM filmes', res);
});

router.get('/filmes/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE id=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM filmes' + filter, res);
});

router.delete('/filmes/:id', (req, res) => {
    execSQLQuery('DELETE FROM filmes WHERE id=' + parseInt(req.params.id), res);
});

router.patch('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const capa = req.body.capa;
    const titulo = req.body.titulo.substring(0, 255);
    const diretor = req.body.diretor.substring(0, 255);
    const genero = req.body.genero.substring(0, 100);
    const duracao = req.body.duracao;
    const data_lancamento = req.body.data_lancamento;
    const sinopse = req.body.sinopse.substring(0, 100);
    const classificacao_indicativa = req.body.classificacao_indicativa.substring(0, 50);
    execSQLQuery(`UPDATE filmes SET capa='${capa}', titulo='${titulo}', diretor='${diretor}', genero='${genero}', duracao='${duracao}', data_lancamento='${data_lancamento}', sinopse='${sinopse}', classificacao_indicativa='${classificacao_indicativa}' WHERE id=${id}`, res);
});

// Rotas para filmes avaliados
router.post('/filmes-avaliados', upload.single('capa'), (req, res) => {
    console.log(req.file);
    const capa = 'uploads/' + req.file.filename;
    const titulo = req.body.titulo.substring(0, 255);
    const diretor = req.body.diretor.substring(0, 255);
    const genero = req.body.genero.substring(0, 100);
    const duracao = req.body.duracao;
    const data_lancamento = req.body.data_lancamento;
    const classificacao_indicativa = req.body.classificacao_indicativa.substring(0, 50);
    const cinematografia = req.body.cinematografia.substring(0, 100);
    const originalidade = req.body.originalidade.substring(0, 100);
    const comentario_tecnico = req.body.comentario_tecnico;

    execSQLQuery(`INSERT INTO filmes_avaliacao (capa, titulo, diretor, genero, duracao, data_lancamento, classificacao_indicativa, cinematografia, originalidade, comentario_tecnico) VALUES ('${capa}', '${titulo}', '${diretor}', '${genero}', ${duracao}, '${data_lancamento}', '${classificacao_indicativa}', '${cinematografia}', '${originalidade}', '${comentario_tecnico}')`, res);
});

router.get('/filmes-avaliados', (req, res) => {
    execSQLQuery('SELECT * FROM filmes_avaliacao', res);
});

router.get('/filmes-avaliados/:id', (req, res) => {
    const id = req.params.id;
    execSQLQuery(`SELECT * FROM filmes_avaliacao WHERE id = ${id}`, res);
});

router.delete('/filmes-avaliados/:id', (req, res) => {
    const id = req.params.id;
    execSQLQuery(`DELETE FROM filmes_avaliacao WHERE id = ${id}`, res);
});

router.patch('/filmes-avaliados/:id', (req, res) => {
    const id = req.params.id;
    const capa = req.body.capa;
    const titulo = req.body.titulo.substring(0, 255);
    const diretor = req.body.diretor.substring(0, 255);
    const genero = req.body.genero.substring(0, 100);
    const duracao = req.body.duracao;
    const data_lancamento = req.body.data_lancamento;
    const classificacao_indicativa = req.body.classificacao.substring(0, 50);
    const cinematografia = req.body.cinematografia.substring(0, 100);
    const originalidade = req.body.originalidade.substring(0, 100);
    const comentario_tecnico = req.body.comentario_tecnico;

    execSQLQuery(`UPDATE filmes_avaliacao SET capa='${capa}', titulo='${titulo}', diretor='${diretor}', genero='${genero}', duracao=${duracao}, data_lancamento='${data_lancamento}', classificacao_indicativa='${classificacao_indicativa}', cinematografia='${cinematografia}', originalidade='${originalidade}', comentario_tecnico='${comentario_tecnico}' WHERE id=${id}`, res);
});

// Rotas para programação de sessões de filme
router.post('/programacao', upload.single('capa'), (req, res) => {
    console.log(req.file);
    const capa = 'uploads/' + req.file.filename;
    const titulo = req.body.titulo.substring(0, 255);
    const diretor = req.body.diretor.substring(0, 100);
    const data = req.body.data.substring(0, 50);
    const horario = req.body.horario.substring(0, 50);
    const local = req.body.local.substring(0, 255);

    // Execute a inserção dos dados na tabela 'programacao' do seu banco de dados
    execSQLQuery(`INSERT INTO programacao (capa, titulo, diretor, data, horario, local) VALUES ('${capa}', '${titulo}', '${diretor}', '${data}', '${horario}', '${local}')`, res);
});

router.get('/programacao', (req, res) => {
    // Retorne todas as sessões de filme da tabela 'programacao'
    execSQLQuery('SELECT * FROM programacao', res);
});

router.get('/programacao/:id', (req, res) => {
    const id = req.params.id;
    // Retorne a sessão de filme com o id informado
    execSQLQuery(`SELECT * FROM programacao WHERE id = ${id}`, res);
});

router.delete('/programacao/:id', (req, res) => {
    const id = req.params.id;
    // Remova a sessão de filme com o id informado
    execSQLQuery(`DELETE FROM programacao WHERE id = ${id}`, res);
});

router.patch('/programacao/:id', (req, res) => {
    const id = req.params.id;
    const capa = req.body.capa;
    const titulo = req.body.titulo.substring(0, 255);
    const diretor = req.body.diretor.substring(0, 100);
    const data = req.body.data.substring(0, 50);
    const horario = req.body.horario.substring(0, 50);
    const local = req.body.local.substring(0, 255);

    // Atualize a sessão de filme com o id informado
    execSQLQuery(`UPDATE programacao SET capa='${capa}', titulo='${titulo}', diretor='${diretor}', data='${data}', hora='${horario}', local='${local}' WHERE id=${id}`, res);
});


//Rotas para inserir ingressos
router.post('/ingressos', upload.single('capa'), (req, res) => {
    console.log(req.file);
    const capa = 'uploads/' + req.file.filename;
    const nome = req.body.nome.substring(0, 255);
    const diretor = req.body.diretor.substring(0, 100);
    const data = req.body.data.substring(0, 50);
    const hora = req.body.hora.substring(0, 50);
    const local = req.body.local.substring(0, 255);
    const vagas = req.body.vagas;

    // Execute a inserção dos dados na tabela 'eventos' do seu banco de dados
    execSQLQuery(`INSERT INTO ingressos (capa, nome, diretor, data, hora, local, vagas) VALUES ('${capa}', '${nome}', '${diretor}', '${data}', '${hora}', '${local}', '${vagas}')`, res);
});

router.get('/ingressos', (req, res) => {
    // Retorne todos os eventos paralelos da tabela 'eventos'
    execSQLQuery('SELECT * FROM ingressos', res);
});

router.get('/ingressos/:id', (req, res) => {
    const id = req.params.id;
    // Retorne o evento paralelo com o id informado
    execSQLQuery(`SELECT * FROM ingressos WHERE id = ${id}`, res);
});

router.delete('/ingressos/:id', (req, res) => {
    const id = req.params.id;
    // Remova o evento paralelo com o id informado
    execSQLQuery(`DELETE FROM ingressos WHERE id = ${id}`, res);
});

router.patch('/ingressos/:id', (req, res) => {
    const id = req.params.id;
    const capa = req.body.capa;
    const nome = req.body.nome.substring(0, 255);
    const diretor = req.body.diretor.substring(0, 100);
    const data = req.body.data.substring(0, 50);
    const hora = req.body.hora.substring(0, 50);
    const local = req.body.local.substring(0, 255);
    const vagas = req.body.vagas;

    // Atualize o evento paralelo com o id informado
    execSQLQuery(`UPDATE ingressos SET capa='${capa}', nome='${nome}', diretor='${diretor}', data='${data}', hora='${hora}', local='${local}', vagas='${vagas}' WHERE id=${id}`, res);
});


//Rotas para eventos paralelos
router.post('/eventos', upload.single('capa'), (req, res) => {
    console.log(req.file);
    const capa = 'uploads/' + req.file.filename;
    const nome = req.body.nome.substring(0, 255);
    const data = req.body.data.substring(0, 50);
    const hora = req.body.hora.substring(0, 50);
    const local = req.body.local.substring(0, 255);
    const descricao = req.body.descricao;

    // Execute a inserção dos dados na tabela 'eventos' do seu banco de dados
    execSQLQuery(`INSERT INTO eventos (capa, nome, data, hora, local, descricao) VALUES ('${capa}', '${nome}', '${data}', '${hora}', '${local}', '${descricao}')`, res);
});

router.get('/eventos', (req, res) => {
    // Retorne todos os eventos paralelos da tabela 'eventos'
    execSQLQuery('SELECT * FROM eventos', res);
});

router.get('/eventos/:id', (req, res) => {
    const id = req.params.id;
    // Retorne o evento paralelo com o id informado
    execSQLQuery(`SELECT * FROM eventos WHERE id = ${id}`, res);
});

router.delete('/eventos/:id', (req, res) => {
    const id = req.params.id;
    // Remova o evento paralelo com o id informado
    execSQLQuery(`DELETE FROM eventos WHERE id = ${id}`, res);
});

router.patch('/eventos/:id', (req, res) => {
    const id = req.params.id;
    const capa = req.body.capa;
    const nome = req.body.nome.substring(0, 255);
    const data = req.body.data.substring(0, 50);
    const hora = req.body.hora.substring(0, 50);
    const local = req.body.local.substring(0, 255);
    const descricao = req.body.descricao;

    // Atualize o evento paralelo com o id informado
    execSQLQuery(`UPDATE eventos SET capa='${capa}', nome='${nome}', data='${data}', hora='${hora}', local='${local}', descricao='${descricao}' WHERE id=${id}`, res);
});

//Rotas para Finalizar Compra
router.post('/finalizar-compra', (req, res) => {
    const { email, ingressoId, quantidade } = req.body;

    // Verificar se o usuário existe
    execSQLQuery(`SELECT id FROM usuarios WHERE email = '${email}'`, (userResult) => {
        if (userResult.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
        }

        const usuarioId = userResult[0].id;

        // Verificar se o ingresso existe e há vagas disponíveis suficientes
        execSQLQuery(`SELECT * FROM ingressos WHERE id = ${ingressoId} AND vagas >= ${quantidade}`, (ingressoResult) => {
            if (ingressoResult.length === 0) {
                return res.status(404).json({ success: false, message: 'Ingresso não encontrado ou não há vagas disponíveis suficientes.' });
            }

            const ingresso = ingressoResult[0];

            // Realizar a compra
            const dataCompra = new Date().toISOString();
            execSQLQuery(`INSERT INTO compras_finalizadas (usuario_id, ingresso_id, quantidade, data_compra) VALUES (${usuarioId}, ${ingressoId}, ${quantidade}, '${dataCompra}')`, (purchaseResult) => {
                if (purchaseResult.affectedRows === 1) {
                    // Atualizar a quantidade de vagas disponíveis
                    const novaQuantidade = ingresso.vagas - quantidade;
                    execSQLQuery(`UPDATE ingressos SET vagas = ${novaQuantidade} WHERE id = ${ingressoId}`, (updateResult) => {
                        if (updateResult.affectedRows === 1) {
                            // Envie um e-mail de confirmação
                            const title = 'Compra Finalizada';
                            const output = `Sua compra foi finalizada com sucesso para o filme ${ingresso.nome}.`;
                            const attachments = []; // Se houver anexos, adicione-os aqui
                            sendEmails(email, title, output, attachments);
                            return res.status(200).json({ success: true, message: 'Compra finalizada com sucesso!' });
                        } else {
                            return res.status(500).json({ success: false, message: 'Erro ao atualizar a quantidade de vagas disponíveis.' });
                        }
                    });
                } else {
                    return res.status(500).json({ success: false, message: 'Erro ao finalizar a compra.' });
                }
            });
        });
    });
});