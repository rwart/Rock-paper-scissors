var gameState = 'notStarted', // started, ended
  player = {
    name: '',
    score: 0,
  },
  computer = {
    score: 0,
  };
var finalScore = 10;
//rps
var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
  pickPaper = document.getElementById('js-playerPick_paper'),
  pickScissors = document.getElementById('js-playerPick_scissors');
pickRock.addEventListener('click', function () {
  playerPick('rock');
});
pickPaper.addEventListener('click', function () {
  playerPick('paper');
});
pickScissors.addEventListener('click', function () {
  playerPick('scissors');
});

var newGameElem = document.getElementById('js-newGameElement'),
  pickElem = document.getElementById('js-playerPickElement'),
  resultsElem = document.getElementById('js-resultsTableElement');

var playerPointsElem = document.getElementById('js-playerPoints'),
  playerNameElem = document.getElementById('js-playerName'),
  computerPointsElem = document.getElementById('js-computerPoints');

var playerPickElem = document.getElementById('js-playerPick'),
  computerPickElem = document.getElementById('js-computerPick'),
  playerResultElem = document.getElementById('js-playerResult'),
  computerResultElem = document.getElementById('js-computerResult');

var winnerElem = document.getElementById('js-winnerElem'),
  winnerName = document.getElementById('js-winnerName');

setGameElements();

function setGameElements() {
  'use strict';
  switch (gameState) {
    case 'started':
      newGameElem.style.display = 'none';
      pickElem.style.display = 'block';
      resultsElem.style.display = 'block';
      winnerElem.style.display = 'none';
      break;
    case 'ended':
      winnerName.innerHTML = (player.score >= finalScore) ? player.name : 'computer';
      winnerElem.style.display = 'block';
      newGameBtn.innerText = 'Play again';
      newGameElem.style.display = 'block';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
      break;
    case 'notStarted':
    default:
      newGameElem.style.display = 'block';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
      winnerElem.style.display = 'none';
  }
}

function newGame() {
  if (!player.name) {
    player.name = prompt('Please enter your name', 'your name');
  }
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }

}

function playerPick(playerPickArg) {
  var computerPick = getComputerPick();

  playerPickElem.innerHTML = playerPickArg;
  computerPickElem.innerHTML = computerPick;

  checkRoundWinner(playerPickArg, computerPick);
  setGamePoints();
  checkEndGame();
}

function getComputerPick() {
  var possiblePicks = ['rock', 'paper', 'scissors'];
  return possiblePicks[Math.floor(Math.random() * 3)];
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

  if (playerPick == computerPick) {
    winnerIs = 'noone'; // remis
  } else if (
    (computerPick == 'rock' && playerPick == 'scissors') ||
    (computerPick == 'scissors' && playerPick == 'paper') ||
    (computerPick == 'paper' && playerPick == 'rock')) {

    winnerIs = 'computer';
  }

  if (winnerIs == 'player') {
    playerResultElem.innerHTML = 'Win!';
    player.score++;
  } else if (winnerIs == 'computer') {
    computerResultElem.innerHTML = 'Win!';
    computer.score++;
  }
}

function setGamePoints() {
  playerPointsElem.innerHTML = player.score;
  computerPointsElem.innerHTML = computer.score;
}

function checkEndGame() {
  if ((player.score >= finalScore) || (computer.score >= finalScore)) {
    gameState = 'ended';
    setGameElements();
    if (player.score >= finalScore) {
      document.getElementById('js-audio-TaDa').play();
    }
  }
}
