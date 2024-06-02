// Estrutura de dados: Cliente e Produtos
const initialClientes = [
    {
        emailCliente: "vitor@gmail.com",
        senhaCliente: "1234",
        nomeCliente: "Vitor Geovani Melo Silva",
        urlAvatarCliente: "/assets/img/avatar1.webp",
        nomeArquivoAvatarCliente: "avatar1.webp"
    },
];

const initialProdutos = [
    {
        idProduto: 1,
        nomeProduto: "Notebook Acer Aspire 3",
        descricaoProduto: "AMD Ryzen 5-7520U, 16GB RAM, SSD 512GB, 15.6 HD, AMD Radeon Graphics, Linux Gutta",
        valorUnitarioProduto: 3000.00,
        qtdEstoqueProduto: 10,
        urlImgProduto: "/assets/img/produto1.jpg",
        nomeArquivoImgProduto: "produto1.jpg"
    },
    {
        idProduto: 2,
        nomeProduto: "iPhone 15 Apple",
        descricaoProduto: "128GB, Câmera Dupla 48MP, Tela 6.1, Preto",
        valorUnitarioProduto: 8000.00,
        qtdEstoqueProduto: 20,
        urlImgProduto: "/assets/img/produto2.jpg",
        nomeArquivoImgProduto: "produto2.jpg"
    },
    {
        idProduto: 3,
        nomeProduto: "Caixa de Som JBL Boombox 3",
        descricaoProduto: "Bluetooth, 80W RMS, IP67, Até 24H bateria, Preto",
        valorUnitarioProduto: 2100.00,
        qtdEstoqueProduto: 30,
        urlImgProduto: "/assets/img/produto3.jpg",
        nomeArquivoImgProduto: "produto3.jpg"
    },
];

// Salvando os dados no localStorage, se ainda não estiverem presentes
if (!localStorage.getItem('clientes')) {
    localStorage.setItem('clientes', JSON.stringify(initialClientes));
}

if (!localStorage.getItem('produtos')) {
    localStorage.setItem('produtos', JSON.stringify(initialProdutos));
}

// Carregar dados do localStorage
const clientesFromStorage = JSON.parse(localStorage.getItem('clientes')) || [];
const produtosFromStorage = JSON.parse(localStorage.getItem('produtos')) || [];

// Função de Login
function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const cliente = clientesFromStorage.find(c => c.emailCliente === email && c.senhaCliente === senha);

    if (cliente) {
        const loginCliente = {
            emailCliente: cliente.emailCliente,
            nomeCliente: cliente.nomeCliente,
            urlAvatarCliente: cliente.urlAvatarCliente,
            nomeArquivoAvatarCliente: cliente.nomeArquivoAvatarCliente
        };
        localStorage.setItem('LoginCliente', JSON.stringify(loginCliente));
    } else {
        localStorage.removeItem('LoginCliente'); // Limpa o estado de login anterior
        alert("Atenção: você não é nosso cliente, faça seu cadastro");
    }

    // Redireciona para a vitrine independentemente do resultado do login
    window.location.href = 'vitrine.html';
}

// Função para carregar a vitrine
function carregarVitrine() {
    console.log("Iniciando o carregamento da vitrine...");

    const loginCliente = JSON.parse(localStorage.getItem('LoginCliente'));
    console.log("Cliente logado:", loginCliente);

    const produtosDiv = document.getElementById('produtos');
    const clienteInfoDiv = document.getElementById('cliente-info');

    if (loginCliente && clienteInfoDiv) {
        clienteInfoDiv.innerHTML = `
            <img src="${loginCliente.urlAvatarCliente}" alt="Avatar" width="50">
            <p>${loginCliente.nomeCliente}</p>
        `;
    }

    produtosFromStorage.forEach(produto => {
        console.log("Carregando produto:", produto);

        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto');
        produtoDiv.innerHTML = `
            <h3>${produto.nomeProduto}</h3>
            <p>${produto.descricaoProduto}</p>
            <p>Preço: R$${produto.valorUnitarioProduto.toFixed(2)}</p>
            <p>Estoque: ${produto.qtdEstoqueProduto}</p>
            <img src="${produto.urlImgProduto}" alt="${produto.nomeProduto}" width="100">
            ${loginCliente ? `
                <input type="number" id="qtd-${produto.idProduto}" min="1" max="${produto.qtdEstoqueProduto}" placeholder="Quantidade">
                <button onclick="adicionarAoCarrinho(${produto.idProduto})">Adicionar ao Carrinho</button>
            ` : ''}
        `;
        produtosDiv.appendChild(produtoDiv);
    });
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(idProduto) {
    const qtd = document.getElementById(`qtd-${idProduto}`).value;
    const produto = produtosFromStorage.find(p => p.idProduto === idProduto);
    const carrinho = JSON.parse(localStorage.getItem('CarrinhoCompras')) || [];

    carrinho.push({ idProduto: produto.idProduto, nomeProduto: produto.nomeProduto, valorUnitarioProduto: produto.valorUnitarioProduto, quantidade: parseInt(qtd) });
    localStorage.setItem('CarrinhoCompras', JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho");
}

// Função para carregar carrinho
function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('CarrinhoCompras')) || [];
    const carrinhoBody = document.getElementById('carrinho-body');
    const produtosCarrinhoDiv = document.getElementById('produtos-carrinho');

    let valorTotalCompra = 0;

    carrinho.forEach((item, index) => {
        const produto = produtosFromStorage.find(p => p.idProduto === item.idProduto);
        const valorTotal = item.valorUnitarioProduto * item.quantidade;
        valorTotalCompra += valorTotal;

        // Adicionar produtos ao resumo do carrinho
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto-carrinho');
        produtoDiv.innerHTML = `
            <p>Id: ${produto.idProduto}</p>
            <p>Nome: ${produto.nomeProduto}</p>
            <p>Valor Unitário: R$${produto.valorUnitarioProduto.toFixed(2)}</p>
            <p>Quantidade: ${item.quantidade}</p>
            <p>Valor Total: R$${valorTotal.toFixed(2)}</p>
            <img src="${produto.urlImgProduto}" alt="${produto.nomeProduto}" width="100">
        `;
        produtosCarrinhoDiv.appendChild(produtoDiv);

        // Adicionar produto à tabela
        const row = carrinhoBody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${produto.idProduto}</td>
            <td>${produto.nomeProduto}</td>
            <td>R$${produto.valorUnitarioProduto.toFixed(2)}</td>
            <td>${item.quantidade}</td>
            <td>R$${valorTotal.toFixed(2)}</td>
            <td><button onclick="removerDoCarrinho(${index})">Remover</button></td>
        `;
    });

    // Adicionar total da compra ao final da tabela
    const totalRow = carrinhoBody.insertRow();
    totalRow.innerHTML = `
        <td colspan="5" style="text-align: right;"><strong>Total:</strong></td>
        <td colspan="2"><strong>R$${valorTotalCompra.toFixed(2)}</strong></td>
    `;
}

// Função para remover item do carrinho
function removerDoCarrinho(index) {
    const carrinho = JSON.parse(localStorage.getItem('CarrinhoCompras')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('CarrinhoCompras', JSON.stringify(carrinho));
    window.location.reload();
}

// Função para finalizar compra
function finalizarCompra() {
    const numeroCartao = prompt("Digite o número do cartão de crédito:");
    const senhaCartao = prompt("Digite a senha do cartão:");

    if (numeroCartao && senhaCartao) {
        alert("Compra efetuada com sucesso");
        localStorage.removeItem('CarrinhoCompras');
        window.location.href = 'vitrine.html';
    } else {
        alert("Por favor, preencha os dados do cartão");
    }
}

// Navegação
function irParaCarrinho() {
    window.location.href = 'carrinho.html';
}

function voltarParaVitrine() {
    window.location.href = 'vitrine.html';
}

// Adicionar event listener para carregar a vitrine ou carrinho após o DOM estar carregado
document.addEventListener('DOMContentLoaded', function () {
    const currentUrl = window.location.pathname;
    if (currentUrl.includes('vitrine.html')) {
        carregarVitrine();
    } else if (currentUrl.includes('carrinho.html')) {
        carregarCarrinho();
    }
});
