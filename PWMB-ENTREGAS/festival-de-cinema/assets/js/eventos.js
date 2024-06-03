// Função para formatar a data no formato dd/mm/yyyy
function formatarData(data) {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Função para carregar os eventos
function carregarEventos() {
    fetch('http://localhost:3000/eventos')
        .then(response => response.json())
        .then(eventos => {
            const eventoLista = document.getElementById('evento-lista');
            eventoLista.innerHTML = '';

            eventos.forEach(evento => {
                const card = `
                    <div class="col-md-8 offset-md-2">
                        <div class="card">
                            <img src="${evento.capa}" class="card-img-top" alt="Banner do Evento">
                            <div class="card-body">
                                <h5 class="card-title">${evento.nome}</h5>
                                <p class="card-text"><strong>Data:</strong> ${evento.data}</p>
                                <p class="card-text"><strong>Hora:</strong> ${evento.hora}</p>
                                <p class="card-text"><strong>Local:</strong> ${evento.local}</p>
                                <p class="card-text"><strong>Descrição:</strong> ${evento.descricao}</p>
                            </div>
                        </div>
                    </div>
                `;
                eventoLista.innerHTML += card;
            });
        })
        .catch(error => console.log(error));
}

// Carregar os eventos quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    carregarEventos();
});