'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');

const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, playing;
//strating conditions
const init = function () {
  score0El.textContent = '0';
  score1El.textContent = '0';
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  //remove the winner class
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  //handling the active player mode
  if (!player0El.classList.contains('player--active')) {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  }
};

init();
//switch player logic
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.genarating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.check if it's not 1:if true,switch to next player:if its false add to the current score
    if (dice !== 1) {
      //Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score>=100?finish the game:switch to the next player
    if (scores[activePlayer] >= 20) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //removing the active player class from the winners class

      // activePlayer === 0
      //   ? player0El.classList.remove('player--active')
      //   : player1El.classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

//the reset btn 'New Game'
btnNew.addEventListener('click', init);
