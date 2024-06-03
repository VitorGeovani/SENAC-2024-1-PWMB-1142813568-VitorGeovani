// Variável global para armazenar os itens no carrinho
let carrinhoItens = [];

// Função para carregar os ingressos
function carregarIngressos() {
    fetch('http://localhost:3000/ingressos')
        .then(response => response.json())
        .then(ingressos => {
            const ingressoLista = document.getElementById('ingresso-lista');
            ingressoLista.innerHTML = '';

            ingressos.forEach(ingresso => {
                const card = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="${ingresso.capa}" class="card-img-top" alt="Banner do Evento">
                            <div class="card-body">
                                <h5 class="card-title">${ingresso.nome}</h5>
                                <p class="card-text"><strong>Diretor:</strong> ${ingresso.diretor}</p>
                                <p class="card-text"><strong>Data:</strong> ${ingresso.data}</p>
                                <p class="card-text"><strong>Hora:</strong> ${ingresso.hora}</p>
                                <p class="card-text"><strong>Local:</strong> ${ingresso.local}</p>
                                <p class="card-text"><strong>Vagas disponíveis:</strong> ${ingresso.vagas}</p>
                                <button class="btn btn-primary comprar-ingresso-btn" data-bs-toggle="modal" data-bs-target="#comprarIngressoModal" data-ingresso-id="${ingresso.id}">Comprar Ingresso</button>
                            </div> 
                        </div>
                    </div>
                `;
                ingressoLista.innerHTML += card;
            });
        })
        .catch(error => console.log(error));
}

// Função para adicionar o ingresso ao carrinho
function adicionarAoCarrinho(ingressoId) {
    // Verifica se o ingresso já está no carrinho
    if (!carrinhoItens.includes(ingressoId)) {
        carrinhoItens.push(ingressoId);
        atualizarIconeCarrinho(); // Atualiza o ícone do carrinho com a quantidade de itens

        // Reduz a quantidade de ingressos disponíveis
        const ingressoCard = document.querySelector(`[data-ingresso-id="${ingressoId}"]`);
        const vagasDisponiveisElement = ingressoCard.querySelector('.vagas-disponiveis');
        let vagasDisponiveis = parseInt(vagasDisponiveisElement.textContent.trim());
        if (vagasDisponiveis > 0) {
            vagasDisponiveisElement.textContent = vagasDisponiveis - 1;
        }
    }
}

// Função para finalizar a compra
function finalizarCompra() {
    // Solicita o e-mail do usuário
    const userEmail = prompt("Por favor, insira seu endereço de e-mail:");

    // Verifica se o usuário inseriu um e-mail
    if (userEmail !== null && userEmail.trim() !== '') {
        // Monta os dados da compra
        const dataCompra = {
            email: userEmail,
            filme: { nome: 'Nome do Filme', data: 'Data do Filme', hora: 'Hora do Filme', local: 'Local do Filme' } // Ajuste os dados do filme conforme necessário
        };

        // Envia os dados da compra para o servidor
        fetch('/finalizar-compra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataCompra)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Imprime a resposta do servidor no console para depuração
            if (data.success) {
                alert('Compra finalizada com sucesso!');
                limparCarrinho(); // Limpa o carrinho após finalizar a compra
                $('#carrinhoModal').modal('hide'); // Fecha o modal do carrinho
            } else {
                alert('Erro ao finalizar a compra.');
            }
        })
        .catch(error => console.error('Erro:', error));
    } else {
        // Se o usuário não inseriu um e-mail, exibe uma mensagem de alerta
        alert('Por favor, insira um endereço de e-mail válido para finalizar a compra.');
    }
}


// Evento de clique no botão "Finalizar Compra"
document.getElementById('finalizarCompraBtn').addEventListener('click', finalizarCompra);

// Função para remover todos os itens do carrinho
function limparCarrinho() {
    carrinhoItens = []; // Limpa o array de itens do carrinho
    atualizarIconeCarrinho(); // Atualiza o ícone do carrinho para exibir a quantidade correta de itens
    exibirCarrinho(); // Atualiza a exibição do carrinho
}

// Função para atualizar o ícone do carrinho com a quantidade de itens
function atualizarIconeCarrinho() {
    const carrinhoIcone = document.getElementById('carrinho-icon');
    const quantidadeItens = carrinhoItens.length;
    const badge = carrinhoIcone.querySelector('.badge');
    badge.textContent = quantidadeItens;
}

// Função para exibir o carrinho
function exibirCarrinho() {
    const carrinho = document.getElementById('carrinho');
    carrinho.innerHTML = '';

    if (carrinhoItens.length === 0) {
        carrinho.innerHTML = '<h3>Carrinho Vazio</h3>';
    } else {
        const listaCarrinho = document.createElement('ul');
        carrinhoItens.forEach(ingressoId => {
            const itemCarrinho = document.createElement('li');
            itemCarrinho.textContent = `Ingresso para o filme: ${ingressoId}`;
            listaCarrinho.appendChild(itemCarrinho);
        });
        carrinho.appendChild(listaCarrinho);
    }

    // Exibir o carrinho
    carrinho.style.display = 'block';
}

// Adiciona evento de clique ao botão "Comprar Ingresso" para adicionar o ingresso ao carrinho
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('comprar-ingresso-btn')) {
        const ingressoId = event.target.getAttribute('data-ingresso-id');
        adicionarAoCarrinho(ingressoId);
        exibirCarrinho();
    }
});

// Adiciona evento de clique ao botão "Limpar Carrinho"
document.getElementById('limparCarrinhoBtn').addEventListener('click', limparCarrinho);

// Finaliza a compra ao clicar no botão "Finalizar Compra"
$('#finalizarCompraBtn').click(function() {
    // Verifica se o carrinho está vazio
    if (carrinhoItens.length === 0) {
        alert('Seu carrinho está vazio. Adicione itens antes de finalizar a compra.');
    } else {
        // Implemente a lógica para finalizar a compra aqui
        alert('Compra finalizada com sucesso! Todos os detalhes serão enviados por e-mail.');
        limparCarrinho(); // Limpa o carrinho após finalizar a compra
        $('#carrinhoModal').modal('hide'); // Fecha o modal do carrinho
    }
});

// Adiciona evento ao modal de carrinho para fechar o carrinho se estiver vazio e o modal for fechado
$('#carrinhoModal').on('hidden.bs.modal', function (e) {
    if (carrinhoItens.length === 0) {
        $('#carrinho').hide(); // Oculta o carrinho
    }
});

// Carrega os ingressos quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    carregarIngressos();
});

// Script jQuery
$(document).ready(function() {
    // Abre o modal do carrinho quando o ícone do carrinho é clicado
    $('#carrinho-icon').click(function() {
        $('#carrinhoModal').modal('show');
    });
});

// Função para exibir os detalhes do filme dentro do carrinho de compras
function exibirDetalhesFilme(ingressoId) {
    fetch(`http://localhost:3000/ingressos/${ingressoId}`)
        .then(response => response.json())
        .then(ingresso => {
            const carrinhoItems = document.getElementById('carrinho-items');
            carrinhoItems.innerHTML = '';
            
            ingresso.forEach(ingresso => {
                const itemCarrinho = `
                    <li class="list-group list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <h6 class="my-0">Nome do Filme: ${ingresso.nome}</h6>
                            <small class="text-muted
                            ">Diretor: ${ingresso.diretor}</small>
                        </div>
                        <span class="text-muted
                        ">Data: ${ingresso.data} | Hora: ${ingresso.hora}</span>
                    </li>
                `;
                carrinhoItems.innerHTML += itemCarrinho;
            });
        })
        .catch(error => console.log(error));
}

// Adiciona evento de clique ao botão "Comprar Ingresso" para adicionar o ingresso ao carrinho
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('comprar-ingresso-btn')) {
        const ingressoId = event.target.getAttribute('data-ingresso-id');
        adicionarAoCarrinho(ingressoId);
        exibirDetalhesFilme(ingressoId); // Exibe os detalhes do filme ao adicionar ao carrinho
        exibirCarrinho();
    }
});

// Função para limpar os detalhes sobre o ingresso
function limparDetalhesFilme() {
    const carrinhoItems = document.getElementById('carrinho-items');
    carrinhoItems.innerHTML = ''; // Limpa o conteúdo dos detalhes sobre o ingresso
}

// Função para remover todos os itens do carrinho
function limparCarrinho() {
    carrinhoItens = []; // Limpa o array de itens do carrinho
    atualizarIconeCarrinho(); // Atualiza o ícone do carrinho para exibir a quantidade correta de itens
    exibirCarrinho(); // Atualiza a exibição do carrinho
    limparDetalhesFilme(); // Limpa os detalhes sobre o ingresso
}