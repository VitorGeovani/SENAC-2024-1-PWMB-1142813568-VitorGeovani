// Função para carregar as avaliações de filmes
function carregarAvaliacoes() {
    fetch('http://localhost:3000/filmes-avaliados')
        .then(response => response.json())
        .then(avaliacoes => {
            const filmeLista = document.getElementById('filme-lista');
            filmeLista.innerHTML = '';

            avaliacoes.forEach(avaliacao => {
                const card = `
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <img src="${avaliacao.capa}" class="card-img-top" alt="Capa do Filme">
                            <div class="card-body">
                                <h5 class="card-title">${avaliacao.titulo}</h5>
                                <p class="card-text"><strong>Diretor:</strong> ${avaliacao.diretor}</p>
                                <p class="card-text"><strong>Gênero:</strong> ${avaliacao.genero}</p>
                                <p class="card-text"><strong>Duração:</strong> ${avaliacao.duracao} minutos</p>
                                <p class="card-text"><strong>Data de Lançamento:</strong> ${avaliacao.data_lancamento}</p>
                                <p class="card-text"><strong>Classificação Indicativa:</strong> ${avaliacao.classificacao_indicativa}</p>
                                <div class="rating">
                                    <p class="card-text"><strong>Cinematografia:</strong> ${avaliacao.cinematografia}</p>
                                    <p class="card-text"><strong>Originalidade:</strong> ${avaliacao.originalidade}</p>
                                    <p class="card-text"><strong>Comentário Técnico:</strong> ${avaliacao.comentario_tecnico}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                filmeLista.innerHTML += card;
            });
        })
        .catch(error => console.log(error));
}

// Carregar as avaliações quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    carregarAvaliacoes();
});
