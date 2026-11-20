'use strict';

const chooseContainer = document.querySelector('#choose-container');

const gameContainer = document.querySelector('#game-container');

const resultContainer = document.querySelector('#result-container');

const finalScore = document.querySelector('#final-score');

const finalMisses = document.querySelector('#final-misses');

const finalAccuracy = document.querySelector('#final-accuracy');

const finalTime = document.querySelector('#final-timer');

const playAgainButton = document.querySelector('#play-again-button');

const mainMenuButton = document.querySelector('#main-menu-button');

const infinityMode = document.querySelector('#infinity-mode');

const timerMode = document.querySelector('#timer-mode');

const timer = document.querySelector('#timer');

const score = document.querySelector('#score');

const misses = document.querySelector('#misses');

const accuracy = document.querySelector('#accuracy');

const playField = document.querySelector('#playfield');

const startButton = document.querySelector('#start-button');

const quitButton = document.querySelector('#quit-button');

const finishButton = document.querySelector('#finish-button');

const aimCircle = document.createElement('div');
aimCircle.id = 'aim-circle';

let gameMode = 'none';

let isGameRunning = false;

let scoreCount = 0;
score.textContent = `Score: ${scoreCount}`;

let missesCount = 0;
misses.textContent = `Misses: ${missesCount}`;

let accuracyCount = 0;
accuracy.textContent = `Accuracy: ${accuracyCount} %`;

let timerCount = 0;

let timerId = 0;

let infinityCount = 0;

let infinityTimerId = 0;

function randomCoordinate(max) {
  return Math.floor(Math.random() * (max + 1));
}

function setAccuracy() {
  const scoreMissesSum = scoreCount + missesCount;
  accuracyCount = scoreMissesSum === 0 ? 0 : ((scoreCount / scoreMissesSum) * 100).toFixed(1);
  accuracy.textContent = `Accuracy: ${accuracyCount} %`;
}

function swapScreen() {
  if (resultContainer.classList.contains('active')) {
    resultContainer.classList.remove('active');
    gameContainer.classList.add('active');
  } else if (gameContainer.classList.contains('active')) {
    gameContainer.classList.remove('active');
    resultContainer.classList.add('active');
  } else {
    chooseContainer.classList.add('active');
    gameContainer.classList.add('active');
  }
}

function timerModeTimer() {
  return setInterval(() => {
    if (timerCount === 0) {
      clearInterval(timerId);
      finishGame();
      return;
    } else if (timerCount < 7) {
      timer.classList.add('last-seconds');
    }
    timerCount--;
    timer.textContent = `Time: ${timerCount}`;
  }, 1000);
}

function infinityModeTimer() {
  return setInterval(() => {
    infinityCount++;
    timer.textContent = `Time: ${infinityCount}`;
  }, 1000);
}

function startGame() {
  if (isGameRunning) {
    return;
  }

  if (gameMode === 'none') {
    alert('Не выбран режим');
    return;
  }

  isGameRunning = true;

  playField.append(aimCircle);

  aimCircle.style.left = `${playField.clientWidth / 2 - aimCircle.clientWidth / 2}px`;
  aimCircle.style.top = `${playField.clientHeight / 2 - aimCircle.clientHeight / 2}px`;

  startButton.style.display = 'none';
  finishButton.style.display = 'flex';

  switch (gameMode) {
    case 'infinity':
      infinityTimerId = infinityModeTimer();
      break;
    case 'timer':
      timerId = timerModeTimer();
      break;
  }
}

function stopGame() {
  aimCircle.remove();

  finishButton.style.display = 'none';
  startButton.style.display = 'flex';
  isGameRunning = false;

  if (gameMode === 'timer') {
    clearInterval(timerId);
  } else if (gameMode === 'infinity') {
    clearInterval(infinityTimerId);
  }
}

function resetStats() {
  scoreCount = 0;
  missesCount = 0;
  accuracyCount = 0;
  score.textContent = `Score: ${scoreCount}`;
  misses.textContent = `Misses: ${missesCount}`;
  accuracy.textContent = `Accuracy: ${accuracyCount} %`;
  if (gameMode === 'timer') {
    timer.classList.remove('last-seconds');
    timerCount = 30;
    timerId = 0;
    timer.textContent = `Time: ${timerCount}`;
  } else if (gameMode === 'infinity') {
    infinityCount = 0;
    infinityTimerId = 0;
    timer.textContent = `Time: ${infinityCount}`;
  }
}

function showResultScreen() {
  finalScore.textContent = `Final score: ${scoreCount}`;
  finalMisses.textContent = `Final misses: ${missesCount}`;
  finalAccuracy.textContent = `Final accuracy: ${accuracyCount}%`;
  if (gameMode === 'infinity') {
    finalTime.textContent = `Final time: ${infinityCount} sec`;
  } else if (gameMode === 'timer') {
    finalTime.textContent = `Final time: ${30 - timerCount} sec`;
  }
}

function finishGame() {
  stopGame();
  swapScreen();
  showResultScreen();
  resetStats();
}

function quit() {
  stopGame();
  resetStats();
  gameMode = 'none';
  gameContainer.classList.remove('active');
  chooseContainer.classList.remove('active');
  resultContainer.classList.remove('active');
}

playField.addEventListener('click', () => {
  if (isGameRunning) {
    missesCount++;
    setAccuracy();
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
  setAccuracy();
  score.textContent = `Score: ${scoreCount}`;
});

infinityMode.addEventListener('click', () => {
  gameMode = 'infinity';
  infinityCount = 0;
  timer.textContent = `Time: ${infinityCount}`;
  swapScreen();
});

timerMode.addEventListener('click', () => {
  gameMode = 'timer';
  timerCount = 30;
  timer.textContent = `Time: ${timerCount}`;
  swapScreen();
});

quitButton.addEventListener('click', () => {
  quit();
});

finishButton.addEventListener('click', () => {
  finishGame();
});

startButton.addEventListener('click', () => {
  startGame();
});

playAgainButton.addEventListener('click', () => {
  swapScreen();
});

mainMenuButton.addEventListener('click', () => {
  quit();
});
