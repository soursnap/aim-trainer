'use strict';

const chooseContainer = document.querySelector('#choose-container');

const gameContainer = document.querySelector('#game-container');

const infinityMode = document.querySelector('#infinity-mode');

const timerMode = document.querySelector('#timer-mode');

const timer = document.querySelector('#timer');

const score = document.querySelector('#score');

const misses = document.querySelector('#misses');

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

let timerCount = 0;
timer.textContent = `Time: ${timerCount}`;

let timerId = 0;

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
  isGameRunning = false;
  timer.classList.remove('last-seconds');
  clearInterval(timerId);
  timerCount = gameMode === 'timer' ? 30 : 0;
  timerId = 0;
  timer.textContent = `Time: ${timerCount}`;
}

function swapScreen() {
  gameContainer.classList.add('active');
  chooseContainer.classList.add('active');
}

playField.addEventListener('click', () => {
  if (isGameRunning) {
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
  gameMode = 'infinity';
  timerCount = 0;
  timer.textContent = `Time: ${timerCount}`;
  swapScreen();
});

timerMode.addEventListener('click', () => {
  gameMode = 'timer';
  timerCount = 30;
  timer.textContent = `Time: ${timerCount}`;
  swapScreen();
});

quitButton.addEventListener('click', () => {
  finishGame();
  gameMode = 'none';
  gameContainer.classList.remove('active');
  chooseContainer.classList.remove('active');
});

finishButton.addEventListener('click', () => {
  finishGame();
});

startButton.addEventListener('click', () => {
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
      timerId = infinityModeTimer();
      break;
    case 'timer':
      timerId = timerModeTimer();
      break;
  }
});

function timerModeTimer() {
  return setInterval(() => {
    if (timerCount === 0) {
      clearInterval(timerId);
      alert(
        `Время вышло! \n Результаты: \n Попаданий - ${scoreCount} \n Промахов - ${missesCount} \n`
      );
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
    timerCount++;
    timer.textContent = `Time: ${timerCount}`;
  }, 1000);
}
