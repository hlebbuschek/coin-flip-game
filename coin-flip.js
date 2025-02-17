let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0
}
function Game(guess){
  const coinFlip = Math.random();
  let coinSide = '';
  if (coinFlip < 0.5) {
    coinSide = 'heads';
  }
  else {
    coinSide = 'tails';
  }
  let result = '';
  if (coinSide === guess) {
    result = 'You win!';
    score.wins ++;
  }
  else {
    result = 'You lose!';
    score.losses ++;
  }
  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.coin-flip-result')
    .innerHTML = `
    <img class="coin" src="img/coin-${coinSide}.png">
    <div class="result">${result}</div>`;
  updateScore(result);
}
function updateScore (result) {
  const winsCount = score.wins;
  const lossesCount = score.losses;
  Object.keys(score).forEach(value => {
    document.querySelector(`.label-${value}`)
      .innerHTML = `${value.charAt(0).toUpperCase() + value.slice(1)} (${score[value]})`;
    if (result === ' ') {
      for (let i = 0; i < score[value]; i++) {
        document.querySelector(`.${value}-count`)
        .innerHTML += '/';
      }
    }
    if (result === 'You lose!' && value === 'losses') {
      document.querySelector('.losses-count')
      .innerHTML += '/';
    }
    else if (result === 'You win!' && value === 'wins') {
      document.querySelector('.wins-count')
      .innerHTML += '/';
    } 
    else if (result === '') {
      document.querySelector(`.${value}-count`)
        .innerHTML = '';
    }
  });
}

document.querySelector('.head-guess')
  .addEventListener('click', () => {Game('heads')});

  document.querySelector('.tail-guess')
  .addEventListener('click', () => {Game('tails')});
document.querySelector('.reset-score-button')
  .addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    localStorage.removeItem('score');
    updateScore('');
  });
updateScore(' ');