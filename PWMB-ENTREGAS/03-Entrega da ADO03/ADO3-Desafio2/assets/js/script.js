let numeros = [];

function adicionarNumero() {
    const numeroInput = document.getElementById('numero');
    const numero = parseInt(numeroInput.value);

    if (isNaN(numero) || numero < 1 || numero > 100 || numeros.includes(numero)) {
        alert(`Número Informado (${numero}) inválido (Deve ser entre 1 e 100 e não pode ser repetido)`);
        return;
    }
    
    numeros.push(numero);
    const select = document.getElementById('numeros');
    const option = document.createElement('option');
    option.text = `Valor ${numero} adicionado`;
    select.add(option);

    numeroInput.value = '';
}

function finalizar() {
    if (numeros.length === 0) {
        alert('Adicione valores antes de finalizar');
        return;
    }

    const totalElementos = numeros.length;
    const maior = Math.max(...numeros);
    const menor = Math.min(...numeros);
    const soma = numeros.reduce((acc, curr) => acc + curr, 0);
    const media = soma / totalElementos;

    document.getElementById('total').innerText = totalElementos;
    document.getElementById('maior').innerText = maior;
    document.getElementById('menor').innerText = menor;
    document.getElementById('soma').innerText = soma;
    document.getElementById('media').innerText = media.toFixed(2);

    document.getElementById('resultado').style.display = 'block';
}