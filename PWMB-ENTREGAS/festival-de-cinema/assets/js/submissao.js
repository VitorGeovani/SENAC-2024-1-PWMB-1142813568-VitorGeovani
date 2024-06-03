document.addEventListener("DOMContentLoaded", function() {
    const filmeContainer = document.getElementById('filme-lista');

    // Fazer a requisição GET para obter os filmes submetidos
    fetch('http://localhost:3000/filmes')
    .then(response => response.json())
    .then(data => {
        // Limpar o conteúdo atual da lista de filmes
        filmeContainer.innerHTML = '';

        // Manipular os dados recebidos e criar os elementos HTML para exibir os filmes
        data.forEach(filme => {
            const filmeCard = document.createElement('div');
filmeCard.classList.add('col-md-4', 'mb-4');

filmeCard.innerHTML = `
    <div class="card">
        <img src="${filme.capa}" class="card-img-top" alt="Capa do Filme">
        <div class="card-body">
            <h5 class="card-title">${filme.titulo}</h5>
            <p class="card-text"><strong>Diretor:</strong> ${filme.diretor}</p>
            <p class="card-text"><strong>Gênero:</strong> ${filme.genero}</p>
            <p class="card-text"><strong>Duração:</strong> ${filme.duracao} minutos</p>
            <p class="card-text"><strong>Data de Lançamento:</strong> ${filme.data_lancamento}</p>
            <p class="card-text"><strong>Sinopse:</strong> ${filme.sinopse}</p>
            <p class="card-text"><strong>Classificação Indicativa:</strong> ${filme.classificacao_indicativa} anos</p>
        </div>
    </div>
`;

filmeContainer.appendChild(filmeCard);
        });
    })
    .catch(error => console.error('Erro:', error));
});
