
const btn_jogar = document.querySelector('#btn-jogar');
const input_name = document.querySelector('#nome_jogador');




// eventos


btn_jogar.addEventListener('click', (e) => {

    const nome_jogador = input_name.value.trim();


    // nao passe caso o nome do jogador for menor que 2 digitos ou vazio

    if(nome_jogador === '' || nome_jogador.length <= 2) return;

    localStorage.setItem('@USER_NAME', nome_jogador);

    location.href = './views/home.html';
    
})


input_name.addEventListener('keyup', (e) => {


    let situacao = true;

    const nome_jogador = input_name.value.trim();

    if(nome_jogador === '' || nome_jogador.length <= 2){
        situacao = false;
    }

    btn_jogar.classList.toggle('pointer', situacao)

})


