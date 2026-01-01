let moves = 0;

let symbols = ['🍎','🍌','🍇','🍓','🍒','🥝'];
let firstCard = null;
let secondCard = null;
let lock = false;

let time = 60;
let tries = 20;
let timer;
let board = document.getElementById('gameBoard');

const timeDisplay = document.getElementById('time');
const triesDisplay = document.getElementById('tries');

function setDifficulty(cardCount) {
  resetGame();
  let selected = symbols.slice(0, cardCount / 2);
  let cards = [...selected, ...selected].sort(() => 0.5 - Math.random());

  board.innerHTML = '';
  cards.forEach(symbol => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.symbol = symbol;
    card.onclick = () => flipCard(card);
    board.appendChild(card);
  });
}

function flip(card, symbol){
  moves++;
  document.getElementById('moves').innerText = moves;
  
  if (lock || card.classList.contains('flipped') || tries <= 0) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.symbol;

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    tries--;
    triesDisplay.textContent = tries;
    checkMatch();
  }
}

function checkMatch() {
  lock = true;
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.textContent = '';
      secondCard.textContent = '';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lock = false;
}

function resetGame() {
  clearInterval(timer);
  time = 60;
  tries = 20;
  timeDisplay.textContent = time;
  triesDisplay.textContent = tries;

  timer = setInterval(() => {
    if (time > 0) {
      time--;
      timeDisplay.textContent = time;
    }
  }, 1000);
}

setDifficulty(8);

function startGame(level){
  const game = document.getElementById('game');
  game.innerHTML = '';
  flipped = [];

  let selectedCards = level === 'hard' ? hardCards : easyCards;

  shuffle(selectedCards).forEach(symbol => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerText = '?';
    card.onclick = () => flip(card, symbol);
    game.appendChild(card);
  });
}

