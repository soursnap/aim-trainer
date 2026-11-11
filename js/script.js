'use strict';

let scoreCount = 0;

const score = document.querySelector('#score');
score.textContent = `Score: ${scoreCount}`;

const playField = document.querySelector('#playfield');

const startButton = document.querySelector('#start-button');

startButton.addEventListener('click', () => {
  const aimCircle = document.createElement('div');
  aimCircle.id = 'aim-circle';

  if (!startButton.classList.contains('started')) {
    startButton.classList.add('started');

    playField.append(aimCircle);

    aimCircle.style.left = `${playField.clientWidth / 2 - aimCircle.clientWidth / 2}px`;
    aimCircle.style.top = `${playField.clientHeight / 2 - aimCircle.clientHeight / 2}px`;

    startButton.style.display = 'none';

    const cancelButton = document.createElement('button');
    cancelButton.id = 'cancel-button';
    cancelButton.textContent = 'Закончить';

    document.body.append(cancelButton);

    cancelButton.addEventListener('click', () => {
      aimCircle.remove();
      scoreCount = 0;
      score.textContent = `Score: ${scoreCount}`;
      cancelButton.remove();
      startButton.style.display = 'flex';
      startButton.classList.remove('started');
    });

    aimCircle.addEventListener('click', () => {
      const maxLeft = playField.clientWidth - aimCircle.clientWidth;
      const maxTop = playField.clientHeight - aimCircle.clientHeight;

      aimCircle.style.left = `${randomCoordinate(maxLeft)}px`;
      aimCircle.style.top = `${randomCoordinate(maxTop)}px`;

      scoreCount++;
      score.textContent = `Score: ${scoreCount}`;
    });
  }
});

function randomCoordinate(max) {
  return Math.floor(Math.random() * (max + 1));
}
