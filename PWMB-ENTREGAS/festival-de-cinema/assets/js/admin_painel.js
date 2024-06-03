// Carregar dados e renderizar na página

// Função para carregar e exibir os filmes inseridos
function loadFilmesInseridos() {
    fetch('http://localhost:3000/filmes') // Rota para buscar os filmes inseridos
        .then(response => response.json())
        .then(data => {
            const filmesList = document.getElementById('filmes-inseridos-list'); // Elemento HTML onde os filmes serão exibidos
            filmesList.innerHTML = ''; // Limpa o conteúdo atual da lista de filmes
            data.forEach(filme => {
                const filmeItem = document.createElement('div'); // Cria um elemento div para cada filme
                filmeItem.classList.add('filme-item'); // Adiciona uma classe ao elemento div

                // Cria o conteúdo HTML para exibir informações do filme
                filmeItem.innerHTML = `
                    <img src="${filme.capa}" alt="${filme.titulo}">
                    <h3>${filme.titulo}</h3>
                    <p><strong>Diretor:</strong> ${filme.diretor}</p>
                    <p><strong>Gênero:</strong> ${filme.genero}</p>
                    <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
                    <p><strong>Data de Lançamento:</strong> ${filme.data_lancamento}</p>
                    <p><strong>Sinopse:</strong> ${filme.sinopse}</p>
                    <p><strong>Classificação Indicativa:</strong> ${filme.classificacao_indicativa}</p>
                    <button type="button" class="btn btn-primary" onclick="openEditDeleteModal('filmes', '${filme.id}')">Editar</button>
                    <button type="button" class="btn btn-danger" onclick="openDeleteModal('filmes', '${filme.id}')">Excluir</button>
                `;

                filmesList.appendChild(filmeItem); // Adiciona o elemento div à lista de filmes
            });
        })
        .catch(error => console.error('Erro ao carregar filmes inseridos:', error));
}

// Função para carregar e exibir os filmes avaliados
function loadFilmesAvaliados() {
    fetch('http://localhost:3000/filmes-avaliados')
        .then(response => response.json())
        .then(data => {
            const filmesList = document.getElementById('filmes-avaliados-list');
            filmesList.innerHTML = ''; // Limpar a lista antes de adicionar os filmes
            data.forEach(filme => {
                const filmeItem = document.createElement('div');
                filmeItem.innerHTML = `
                    <div>
                        <img src="${filme.capa}" alt="${filme.titulo}" width="100">
                        <h3>${filme.titulo}</h3>
                        <p>${filme.comentario_tecnico}</p>
                        <button type="button" class="btn btn-primary" onclick="openEditDeleteModal('filmes-avaliados', '${filme.id}')">Editar</button>
                        <button type="button" class="btn btn-danger" onclick="openDeleteModal('filmes-avaliados', '${filme.id}')">Excluir</button>
                    </div>
                `;
                filmesList.appendChild(filmeItem);
            });
        })
        .catch(error => console.error('Erro ao carregar filmes avaliados:', error));
}

// Função para carregar e exibir as programações
function loadProgramacoes() {
    fetch('http://localhost:3000/programacao')
        .then(response => response.json())
        .then(data => {
            const programacoesList = document.getElementById('programacoes-list');
            programacoesList.innerHTML = ''; // Limpar a lista antes de adicionar as programações
            data.forEach(programacao => {
                const programacaoItem = document.createElement('div');
                programacaoItem.innerHTML = `
                    <div>
                        <h3>${programacao.titulo}</h3>
                        <p>Data: ${programacao.data}, Horário: ${programacao.horario}, Local: ${programacao.local}</p>
                        <button type="button" class="btn btn-primary" onclick="openEditDeleteModal('programacoes', '${programacao.id}')">Editar</button>
                        <button type="button" class="btn btn-danger" onclick="openDeleteModal('programacoes', '${programacao.id}')">Excluir</button>
                    </div>
                `;
                programacoesList.appendChild(programacaoItem);
            });
        })
        .catch(error => console.error('Erro ao carregar programações:', error));
}

// Função para carregar e exibir os ingressos disponíveis
function loadIngressos() {
    fetch('http://localhost:3000/ingressos')
        .then(response => response.json())
        .then(data => {
            const ingressosList = document.getElementById('ingressos-list');
            ingressosList.innerHTML = ''; // Limpar a lista antes de adicionar os ingressos
            data.forEach(ingresso => {
                const ingressoItem = document.createElement('div');
                ingressoItem.innerHTML = `
                    <div>
                        <h3>${ingresso.nome}</h3>
                        <p>Data: ${ingresso.data}, Horário: ${ingresso.hora}, Local: ${ingresso.local}, Vagas: ${ingresso.vagas}</p>
                        <button type="button" class="btn btn-primary" onclick="openEditDeleteModal('ingressos', '${ingresso.id}')">Editar</button>
                        <button type="button" class="btn btn-danger" onclick="openDeleteModal('ingressos', '${ingresso.id}')">Excluir</button>
                    </div>
                `;
                ingressosList.appendChild(ingressoItem);
            });
        })
        .catch(error => console.error('Erro ao carregar ingressos:', error));
}

// Função para carregar e exibir os eventos paralelos
function loadEventosParalelos() {
    fetch('http://localhost:3000/eventos')
        .then(response => response.json())
        .then(data => {
            const eventosList = document.getElementById('eventos-paralelos-list');
            eventosList.innerHTML = ''; // Limpar a lista antes de adicionar os eventos
            data.forEach(evento => {
                const eventoItem = document.createElement('div');
                eventoItem.innerHTML = `
                    <div>
                        <h3>${evento.nome}</h3>
                        <p>Data: ${evento.data}, Horário: ${evento.hora}, Local: ${evento.local}</p>
                        <button type="button" class="btn btn-primary" onclick="openEditDeleteModal('eventos', '${evento.id}')">Editar</button>
                        <button type="button" class="btn btn-danger" onclick="openDeleteModal('eventos', '${evento.id}')">Excluir</button>
                    </div>
                `;
                eventosList.appendChild(eventoItem);
            });
        })
        .catch(error => console.error('Erro ao carregar eventos paralelos:', error));
}

// Chamar as funções para carregar e exibir os dados ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    loadFilmesInseridos();
    loadFilmesAvaliados();
    loadProgramacoes();
    loadIngressos();
    loadEventosParalelos();
});

// Variável para armazenar o ID do item selecionado
let selectedItemId;

// Função para abrir o modal de edição/exclusão
function openEditDeleteModal(type, id) {
    selectedItemId = id;
    $('#editModal').modal('show'); // Abrir o modal
    // Carregar os dados do item selecionado no modal
    fetch(`http://localhost:3000/${type}/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('editTitle').value = data.titulo;
            document.getElementById('editDiretor').value = data.diretor;
            document.getElementById('editGenero').value = data.genero;
            document.getElementById('editDuracao').value = data.duracao;
            document.getElementById('editData').value = data.data_lancamento;
            document.getElementById('editSinopse').value = data.sinopse;
            document.getElementById('editClassificacao').value = data.classificacao_indicativa;
        })
        .catch(error => console.error('Erro ao carregar o item:', error));

    // Adicionar evento de clique ao botão de salvar alterações
    const saveButton = document.getElementById('saveButton');
    saveButton.onclick = function() {
        saveChanges(type, id);
    };
}

// Função para abrir o modal de exclusão
function openDeleteModal(type, id) {
    selectedItemId = id;
    $('#deleteModal').modal('show'); // Abrir o modal de exclusão

    // Adicionar evento de clique ao botão de confirmar exclusão
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    confirmDeleteButton.onclick = function() {
        deleteItem(type, id);
    };
}

// Função para salvar as alterações feitas no modal de edição
function saveChanges(type, id) {
    const newTitle = document.getElementById('editTitle').value;
    const newDiretor = document.getElementById('editDiretor').value;
    const newGenero = document.getElementById('editGenero').value;
    const newDuracao = document.getElementById('editDuracao').value;
    const newLancamento = document.getElementById('editData').value;
    const newSinopse = document.getElementById('editSinopse').value;
    const newClassificacao = document.getElementById('editClassificacao').value;

    const updatedItem = {
        titulo: newTitle,
        diretor: newDiretor,
        genero: newGenero,
        duracao: newDuracao,
        data_lancamento: newLancamento,
        sinopse: newSinopse,
        classificacao_indicativa: newClassificacao
    };

    fetch(`http://localhost:3000/${type}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedItem)
    })
    .then(response => {
        if (response.ok) {
            $('#editModal').modal('hide'); // Fechar o modal após a atualização
            if (type === 'filmes') {
                loadFilmesInseridos(); // Recarrega a lista de filmes inseridos
            } else if (type === 'filmes-avaliados') {
                loadFilmesAvaliados(); // Recarrega a lista de filmes avaliados
            } else if (type === 'programacoes') {
                loadProgramacoes(); // Recarrega a lista de programações
            } else if (type === 'ingressos') {
                loadIngressos(); // Recarrega a lista de ingressos
            } else if (type === 'eventos') {
                loadEventosParalelos(); // Recarrega a lista de eventos paralelos
            }
        } else {
            // Se a resposta não estiver OK, lança um erro com a mensagem da resposta
            response.json().then(data => {
                throw new Error(data.message);
            });
        }
    })
    .catch(error => console.error('Erro ao atualizar o item:', error.message));
}

// Função para excluir um item
function deleteItem(type, id) {
    fetch(`http://localhost:3000/${type}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir o item');
        }
        $('#deleteModal').modal('hide'); // Fechar o modal após a exclusão
        if (type === 'filmes') {
            loadFilmesInseridos(); // Recarrega a lista de filmes inseridos
        } else if (type === 'filmes-avaliados') {
            loadFilmesAvaliados(); // Recarrega a lista de filmes avaliados
        } else if (type === 'programacoes') { // Aqui estava 'programacao'
            loadProgramacoes(); // Recarrega a lista de programações
        } else if (type === 'ingressos') {
            loadIngressos(); // Recarrega a lista de ingressos
        } else if (type === 'eventos') {
            loadEventosParalelos(); // Recarrega a lista de eventos paralelos
        }
    })
    .catch(error => console.error('Erro ao excluir o item:', error));
}

// Carregar dados iniciais
document.addEventListener('DOMContentLoaded', function() {
    loadFilmesInseridos();
    loadFilmesAvaliados();
    loadProgramacoes();
    loadIngressos();
    loadEventosParalelos();
});