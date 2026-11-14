'use strict';

const chooseContainer = document.querySelector('#choose-container');

const gameContainer = document.querySelector('#game-container');

const infinityMode = document.querySelector('#infinity-mode');

const timerMode = document.querySelector('#timer-mode');

const score = document.querySelector('#score');

const misses = document.querySelector('#misses');

const playField = document.querySelector('#playfield');

const startButton = document.querySelector('#start-button');

const quitButton = document.querySelector('#quit-button');

const finishButton = document.querySelector('#finish-button');

const aimCircle = document.createElement('div');
aimCircle.id = 'aim-circle';

let scoreCount = 0;
score.textContent = `Score: ${scoreCount}`;

let missesCount = 0;
misses.textContent = `Misses: ${missesCount}`;

function randomCoordinate(max) {
  return Math.floor(Math.random() * (max + 1));
}

function finishGame() {
  aimCircle.remove();
  scoreCount = 0;
  missesCount = 0;
  score.textContent = `Score: ${scoreCount}`;
  misses.textContent = `Misses: ${missesCount}`;
  finishButton.style.display = 'none';
  startButton.style.display = 'flex';
  startButton.classList.remove('started');
}

function swapScreen() {
  gameContainer.classList.add('active');
  chooseContainer.classList.add('active');
}

playField.addEventListener('click', () => {
  if (startButton.classList.contains('started')) {
    missesCount++;
    misses.textContent = `Misses: ${missesCount}`;
  }
});

aimCircle.addEventListener('click', (event) => {
  event.stopPropagation();
  const maxLeft = playField.clientWidth - aimCircle.clientWidth;
  const maxTop = playField.clientHeight - aimCircle.clientHeight;

  aimCircle.style.left = `${randomCoordinate(maxLeft)}px`;
  aimCircle.style.top = `${randomCoordinate(maxTop)}px`;

  scoreCount++;
  score.textContent = `Score: ${scoreCount}`;
});

infinityMode.addEventListener('click', () => {
  swapScreen();
});

timerMode.addEventListener('click', () => {
  swapScreen();
});

quitButton.addEventListener('click', () => {
  finishGame();
  gameContainer.classList.remove('active');
  chooseContainer.classList.remove('active');
});

finishButton.addEventListener('click', () => {
  finishGame();
});

startButton.addEventListener('click', () => {
  if (!startButton.classList.contains('started')) {
    startButton.classList.add('started');

    playField.append(aimCircle);

    aimCircle.style.left = `${playField.clientWidth / 2 - aimCircle.clientWidth / 2}px`;
    aimCircle.style.top = `${playField.clientHeight / 2 - aimCircle.clientHeight / 2}px`;

    startButton.style.display = 'none';
    finishButton.style.display = 'flex';
  }
});
