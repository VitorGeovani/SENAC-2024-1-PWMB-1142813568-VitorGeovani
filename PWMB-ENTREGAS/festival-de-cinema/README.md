<div align="center">
  <img src="https://github.com/VitorGeovani/festival-de-cinema/assets/71882193/ab203d39-0b8e-4b54-a4ce-713023002d5e" width="200px" />
</div>

<h1 align="center"> Festival Cinemado</h1>

<h3 align="center">:bookmark_tabs: Aplicação Web para o Festival fictício de cinema de Gramado (Cinemado)</h3>

<div align="center">
 <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
 <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
 <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
 <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" />
  <br>
 <img src="https://img.shields.io/github/repo-size/VitorGeovani/festival-de-cinema">
 <img src="https://img.shields.io/github/last-commit/VitorGeovani/festival-de-cinema">
 <img src="https://img.shields.io/github/forks/VitorGeovani/festival-de-cinema" />
 </div>

 <br>

 ## <a name="SobreoProjeto"></a>:information_source: Especificações do Projeto

O Festival Cinemado é uma aplicação web desenvolvida para gerenciar um festival fictício de cinema em Gramado. Inspirado por um projeto da matéria de Programação Web do curso de TADS do SENAC - SP, este projeto permite a administração completa dos filmes, ingressos e eventos do festival, além de facilitar a interação do público com as atividades programadas.
<br>
<br>

## <a name="SobreoProjeto"></a>:pushpin: Funcionalidades
```
- Registrar novos usuários no sistema;
- Fazer login e obter acesso às funcionalidades do sistema;
- Adicionar filmes ao catálogo e permitir edição, listagem ou exclusão de filmes;
- Avaliar os filmes do catálogo com notas de Cinematografia, Originalidade e Comentários Técnicos, além de permitir edição, listagem ou exclusão das avaliações;
- Criar programações baseadas nos filmes do catálogo, especificando título, diretor, data, horário e local da sessão, com opções de edição, listagem ou exclusão das programações;
- Gerar ingressos com base nas programações criadas, especificando o filme, diretor, data, horário, local e quantidade de vagas disponíveis;
- Criar eventos paralelos ou adicionais ao festival, ampliando as opções para o público.
```


## <a name="SobreoProjeto"></a>:computer: Como Usar
```
1. Clone o repositório para o seu ambiente local.
2. Abra o terminal na pasta do projeto e execute `npm install` para instalar as dependências.
3. Configure o banco de dados MySQL utilizando o script fornecido na seção "Banco de Dados".
4. Execute `node banco.js` para criar as tabelas necessárias.
5. Inicie a aplicação com `node index.js`.
6. Acesse a aplicação no navegador em `http://localhost:3000` e cadastre-se no sistema.
7. Faça login para acessar as funcionalidades disponíveis.
```

## <a name="RecursosUtilizadosNesteProjeto"></a>⚒ Recursos utilizados neste projeto
<table align="center">
<th><h3>Linguagem</h3></th>
 <th><h3>Front-End</h3></th>
 <th><h3>Back-End</h3></th>
    <th><h3>Banco de Dados</h3></th>
  <tr>
      <td valign="top" align="center">
      <a href="https://www.javascript.com/"><img height="100" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" style="max-width:100%;"></img></a>
      </td>
   <td valign="top" align="center">
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img height="100" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" style="max-width:100%;"></img></a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img height="100" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" style="max-width:100%;"></img></a>
      </td>
      <td valign="top" align="center">
      <a href="https://nodejs.org/en/"><img height="100" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" style="max-width:100%;"></img></a>
      </td>
      <td valign="top" align="center">
      <a href="https://www.mysql.com/"><img height="100" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" style="max-width:100%;"></img></a>
      </td>
  </tr>
</table>



### Dependências do projeto:
    Express 4.19.2 - É um framework para Node.js que fornece recursos mínimos para construção de servidores web.
    Nodemon 3.1.0 - Para restartar o server sempre que houver uma alteração.
    Jsonwebtoken 8.5.1 - Utilizado para criação e posteriormente verificação de token para autenticação.
    Bcrypt 5.0.1 - Para criptografar as senhas de usuários antes de salvar no banco.
    Crypto 1.0.1 - Utilizado para criar um token aleatório que será transformado em string.
    Cors 2.8.5 - É um mecanismo utilizado pelos navegadores para compartilhar recursos entre diferentes origens.
    Multer 1.4.5 - É um middleware node.js para lidar com multipart, que é usado principalmente para fazer upload de arquivos.
    Nodemailer 6.9.13 - Utilizado para enviar e-mails.
    MariaDB 2.18.1 - É o banco de dados que nos usamos (dependência utilizada para conexão da ORM com banco de dados).
    Dotenv 16.4.5 - Utilizado para setar as variáveis de ambiente (dados sensíveis).


<br>

## <a name="ComoContribuirParaOProjeto"></a>Como contribuir para o projeto ⁉️

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://github.com/firstcontributions/first-contributions)

<br>

## <a name="Desenvolvedores"></a> :rocket: Desenvolvedores :octocat:
<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/VitorGeovani">
    <img src="https://avatars.githubusercontent.com/u/71882193?v=4" width="100px" alt="Imagem do perfil do Vitor"/>
    <br />
     <sub><b>Vitor</b></sub><br />
     </td>
    <td align="center"><a href="https://github.com/pudimpudi">
    <img src="https://avatars.githubusercontent.com/u/127544518?v=4" width="100px" alt="Imagem do perfil da Gabi"/>
    <br />
    <sub><b>Gabrielle</b></sub><br />
     </td>
 </tr>
</table>

## <a name="ComoContribuirParaOProjeto"></a>Banco de Dados :memo:

```
CREATE DATABASE cinema;

CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    senha VARCHAR(100)
);

CREATE TABLE filmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    capa VARCHAR(255),   
    titulo VARCHAR(255) NOT NULL,
    diretor VARCHAR(255) NOT NULL,
    genero VARCHAR(100),
    duracao INT,
    data_lancamento VARCHAR(50),
    sinopse TEXT,
    classificacao_indicativa VARCHAR(50)
);

CREATE TABLE filmes_avaliacao (
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
);

CREATE TABLE programacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    capa VARCHAR(255),
    titulo VARCHAR(255),
    diretor VARCHAR(100),
    data VARCHAR(50),
    horario VARCHAR(50),
    local VARCHAR(255)
);

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    capa VARCHAR(255),
    nome VARCHAR(255),
    data VARCHAR(50),
    hora VARCHAR(50),
    local VARCHAR(255),
    descricao TEXT
);

CREATE TABLE ingressos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    capa VARCHAR(255),
    nome VARCHAR(255),
    diretor VARCHAR(100),
    data VARCHAR(50),
    hora VARCHAR(50),
    local VARCHAR(255),
    vagas INT
);

CREATE TABLE compras_finalizadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    ingresso_id INT,
    quantidade INT,
    data_compra DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (ingresso_id) REFERENCES ingressos(id)
);

```
    
<div align="center">
  <sub><b>© 2024 Cinemado - Administração</b></sub>
</div>
