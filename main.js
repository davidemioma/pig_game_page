"use strict";

//Don't put . for classlist

//Selecting Elements
let player1 = document.querySelector(".player_0");
let player2 = document.querySelector(".player_1");
let score1 = document.querySelector("#score_0");
let score2 = document.querySelector("#score_1");
let rollDice = document.querySelector(".dice");
let current1 = document.querySelector("#current_0");
let current2 = document.querySelector("#current_1");
const btnRoll = document.querySelector(".btn_roll");
const btnHold = document.querySelector(".btn_hold");
const btnNew = document.querySelector(".btn_new");

let allScores, currentScore, activePlayer, isPlaying;

//Starting conditions
function init() {
  allScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score1.textContent = 0;
  score2.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;

  rollDice.classList.add("hidden");
  player1.classList.remove("player_winner");
  player2.classList.remove("player_winner");
  player1.classList.add("player_active");
  player2.classList.remove("player_active");
}

init();

function switchPlayer() {
  document.querySelector(`#current_${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player_active");
  player2.classList.toggle("player_active");
}

//Rolling button functionality
btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    //Create a random dice
    const randomDice = Math.trunc(Math.random() * 5) + 1;

    //Display the dice
    rollDice.classList.remove("hidden");
    rollDice.src = `./images/dice-${randomDice}.png`;

    //test if dice is not 1
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.querySelector(`#current_${activePlayer}`).textContent =
        currentScore;
    }

    //test if dice is 1
    if (randomDice === 1) {
      switchPlayer();
    }
  }
});

//Hold button functionality
btnHold.addEventListener("click", function () {
  if (isPlaying) {
    //Add current score to active player score
    allScores[activePlayer] += currentScore;
    document.getElementById(`score_${activePlayer}`).textContent =
      allScores[activePlayer];

    //Check if score >= 100
    if (allScores[activePlayer] < 100) {
      switchPlayer();
    }

    if (allScores[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player_${activePlayer}`)
        .classList.add("player_winner");
      document
        .querySelector(`.player_${activePlayer}`)
        .classList.remove("player_active");
      rollDice.classList.add("hidden");
    }
  }
});

btnNew.addEventListener("click", init);
