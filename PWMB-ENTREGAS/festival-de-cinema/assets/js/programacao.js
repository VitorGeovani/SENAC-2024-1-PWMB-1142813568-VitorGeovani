// Função para carregar a programação de filmes
function carregarProgramacao() {
    fetch('http://localhost:3000/programacao')
        .then(response => response.json())
        .then(programacao => {
            const programacaoLista = document.getElementById('programacao-lista');
            programacaoLista.innerHTML = '';

            programacao.forEach(sessao => {
                const card = `
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <img src="${sessao.capa}" class="card-img-top" alt="Sala de Cinema">
                            <div class="card-body">
                                <h5 class="card-title">${sessao.titulo}</h5>
                                <p class="card-text"><strong>Diretor:</strong> ${sessao.diretor}</p>
                                <p class="card-text"><strong>Data:</strong> ${sessao.data}</p>
                                <p class="card-text"><strong>Hora:</strong> ${sessao.horario}</p>
                                <p class="card-text"><strong>Local:</strong> ${sessao.local}</p>
                            </div>
                        </div>
                    </div>
                `;
                programacaoLista.innerHTML += card;
            });
        })
        .catch(error => console.log(error));
}

// Carregar a programação quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    carregarProgramacao();
});
