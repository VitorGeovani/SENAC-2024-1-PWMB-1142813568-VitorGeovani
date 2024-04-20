function verificar(){
    var data = new Date();
    var ano = data.getFullYear();
    var fano = document.getElementById('ano');
    var res = document.querySelector('div.resultado');
    if(fano.value.length == 0 || fano.value > ano || fano.value < 1900){
        alert('Verifique os dados e tente novamente!');
    }else{
        var fsex = document.getElementsByName('sexo');
        var idade = ano - Number(fano.value);
        var genero = '';
        var img = document.createElement('img');
        img.setAttribute('id', 'foto');

        var generoSelecionado = document.querySelector('input[name="sexo"]:checked');
        if (generoSelecionado) {
            genero = generoSelecionado.value;
            if (genero === 'Homem') {
                if (idade >= 0 && idade < 10) {
                    img.setAttribute('src', '/assets/img/foto-bebe-m.png');
                } else if (idade < 21) {
                    img.setAttribute('src', '/assets/img/foto-jovem-m.png');
                } else if (idade < 50) {
                    img.setAttribute('src', '/assets/img/foto-adulto-m.png');
                } else {
                    img.setAttribute('src', '/assets/img/foto-idoso-m.png');
                }
            } else if (genero === 'Mulher') {
                if (idade >= 0 && idade < 10) {
                    img.setAttribute('src', '/assets/img/foto-bebe-f.png');
                } else if (idade < 21) {
                    img.setAttribute('src', '/assets/img/foto-jovem-f.png');
                } else if (idade < 50) {
                    img.setAttribute('src', '/assets/img/foto-adulto-f.png');
                } else {
                    img.setAttribute('src', '/assets/img/foto-idoso-f.png');
                }
            }
        } else {
            alert('Selecione o sexo!');
            return;
        }

        res.style.textAlign = 'center';
        idade.innerHTML = idade;
        genero.innerHTML = genero;
        res.innerHTML = `Gênero: ${genero}, com ${idade} anos de idade`;
        res.appendChild(img);
    }
}