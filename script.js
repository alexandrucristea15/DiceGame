'use strict';
// mapping and variables

let score = 0;
let overAllScore0 = 0;
let overAllScore1 = 0;
let winner = false;
const winner0 = document.querySelector('.winner0');
const player0 = document.querySelector('.player--0');
const score0 = document.getElementById('score--0');
const currentScore0 = document.getElementById('current--0');
const winner1 = document.querySelector('.winner1');
const player1 = document.querySelector('.player--1');
const score1 = document.getElementById('score--1');
const currentScore1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

const PLAYER0 = 'player_0';
const PLAYER1 = 'player_1';

//Useful functions and declarations

const holdScore = p => {
  if (p === PLAYER0) {
    overAllScore0 += score;
    score0.textContent = overAllScore0;
    score = 0;
    currentScore0.textContent = score;
    if (overAllScore0 >= 100) {
      show(winner0);
      player0.classList.add('player--winner');
      winner = true;
    } else switchPlayer(player0, player1);
  } else {
    overAllScore1 += score;
    score1.textContent = overAllScore1;
    score = 0;
    currentScore1.textContent = score;
    if (overAllScore1 >= 100) {
      show(winner1);
      player1.classList.add('player--winner');
      winner = true;
    } else switchPlayer(player1, player0);
  }
};

const resetPlayer = p => {
  score = 0;
  if (p === player0) {
    overAllScore0 = 0;
    currentScore0.textContent = score;
    score0.textContent = overAllScore0;
    player0.classList.remove('player--winner');
    hide(winner0);
  } else {
    overAllScore1 = 0;
    currentScore1.textContent = score;
    score1.textContent = overAllScore1;
    player1.classList.remove('player--winner');
    hide(winner1);
  }
};

const switchPlayer = (p1, p2) => {
  p1.classList.remove('player--active');
  p2.classList.add('player--active');
};

const hide = el => {
  el.classList.add('hidden');
};
const show = el => {
  el.classList.remove('hidden');
};

const generateRandomDice = () => Math.trunc(Math.random() * 6) + 1;

// Code that makes stuff work
const rollDice = () => {
  show(dice);
  const rolledDice = generateRandomDice();
  dice.src = `dice-${rolledDice}.png`;
  if (rolledDice === 1 && !winner) {
    score = 0;
    if (player0.classList.contains('player--active')) {
      switchPlayer(player0, player1);
      currentScore0.textContent = score;
    } else {
      switchPlayer(player1, player0);
      currentScore1.textContent = score;
    }
  } else if (!winner) {
    score += rolledDice;
    player0.classList.contains('player--active')
      ? (currentScore0.textContent = score)
      : (currentScore1.textContent = score);
  }
};

const holdDice = () => {
  dice.classList.remove('hidden');
  if (player0.classList.contains('player--active') && !winner) {
    holdScore(PLAYER0);
  } else if (!winner) {
    holdScore(PLAYER1);
  }
};
const newGameHandler = () => {
  resetPlayer(player0);
  resetPlayer(player1);
  winner = false;
  switchPlayer(player1, player0);
  hide(dice);
};

roll.addEventListener('click', rollDice);
hold.addEventListener('click', holdDice);
newGame.addEventListener('click', newGameHandler);
