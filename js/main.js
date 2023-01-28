let grid_cards = document.querySelector(".grid-cards");
const header_game = document.querySelector("#header_game");
const elementoNomeJogador = document.querySelector("#jogador_name");
const time = document.querySelector("#time");

const btn_jogar = document.querySelector(".btn-jogar");
const btn_sair = document.querySelector(".btn-sair");

let temporizador = 1;

let endGame = false;

const principal = () => {
  renderizarHeaderGame();

  let duplicatedCharacters = [...characters, ...characters];

  let randomCharacters = embaralharArray(duplicatedCharacters);

  randomCharacters.forEach((character) => {
    let card = createCard(character);

    grid_cards.appendChild(card);
  });

  adicionarEventoCards();
};

const embaralharArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const characters = ["bulbasaur", "charmander", "eevee", "pikachu", "squirtle"];
const cores = {
  bulbasaur: "#d6ebdc",
  charmander: "#ffebca",
  eevee: "#e8e8e8",
  pikachu: "#f5f2df",
  squirtle: "#dfecf5",
};
const valores = {
  bulbasaur: 0,
  charmander: 1,
  eevee: 2,
  pikachu: 3,
  squirtle: 4,
};

const createCard = (character) => {
  let card = createElement("div", "card");
  let front = createElement("div", "face front");
  let back = createElement("div", "face back");

  front.style.backgroundImage = `url("../img/${character}.png")`;

  back.setAttribute("data-id", valores[character]);

  front.style.backgroundColor = cores[character];

  card.appendChild(front);
  card.appendChild(back);

  return card;
};

let first_card = "";
let second_card = "";

const reveledCard = ({ target }) => {
  if (target.parentNode.className.includes("revelar")) return;

  if (target.parentNode.className.includes("desabilitar")) return;

  let cardSelecionado = target.parentNode;

  if (first_card === "") {
    cardSelecionado.classList.add("revelar");
    first_card = target;
  } else if (second_card === "") {
    cardSelecionado.classList.add("revelar");
    second_card = target;

    checkSelectedCards();
  }
};

const checkEndGame = () => {
  console.log("entrei");

  if (contadorFinalizarJogo === tamanhoOriginal) {
    document.querySelector(".modal-finalizar").style.display = "block";
    let modal = document.querySelector(".modal");

    let h2 = modal.querySelector(".tempo_game");
    endGame = true;
    h2.innerHTML = `Você terminou o jogo em ${temporizador - 1} segundos`;

    modal.classList.add("animar");
  }
};

let contadorFinalizarJogo = 0;
let tamanhoOriginal = characters.length;

const createElement = (tag, className) => {
  const element = document.createElement(tag);

  element.className = className;

  return element;
};

const checkSelectedCards = () => {
  let firstCardId = first_card.getAttribute("data-id");
  let secondCardId = second_card.getAttribute("data-id");

  console.log(firstCardId === secondCardId);

  if (firstCardId === secondCardId) {
    contadorFinalizarJogo++;

    first_card.classList.add("desabilitar");
    second_card.classList.add("desabilitar");

    first_card = "";
    second_card = "";

    checkEndGame();

    return;
  }

  // caso for diferentes

  clearSelectedCards();
};

const clearSelectedCards = () => {
  setTimeout(() => {
    let firstCardSelecionado = first_card.parentNode;
    let secondCardSelecionado = second_card.parentNode;

    firstCardSelecionado.classList.remove("revelar");
    secondCardSelecionado.classList.remove("revelar");

    first_card = "";
    second_card = "";
  }, 500);
};

const renderizarHeaderGame = () => {
  let nome_jogador = localStorage.getItem("@USER_NAME");
  elementoNomeJogador.innerHTML = nome_jogador;
  renderizarTempo();
};

const renderizarTempo = () => {
  time.innerHTML = temporizador;
  temporizador++;
};

setInterval(() => {
  if (!endGame) {
    renderizarTempo();
  }
}, 1000);

const adicionarEventoCards = () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", reveledCard);
  });
};

btn_jogar.addEventListener("click", (e) => {
  resetGameStatus();
  principal();
});
btn_sair.addEventListener("click", (e) => {
  location.href = "../index.html";
  resetGameStatus();
  localStorage.clear();
});

const resetGameStatus = () => {
  temporizador = 1;
  contadorFinalizarJogo = 0;
  endGame = false;

  document.querySelector(".modal-finalizar").style.display = "none";
  let modal = document.querySelector(".modal");

  modal.classList.remove("animar");

  grid_cards.innerText = "";
};

principal();
