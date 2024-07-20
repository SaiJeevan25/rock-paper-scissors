let scoreDetails = JSON.parse(localStorage.getItem('Score')) || {
  Win: 0,
  Lose: 0,
  Tie: 0
};

updateScore()

const addMoveAndResultClasses = () => {
  document.querySelector('.container')
    .classList.add('js-container');
};

const handleClick = (userMove, computerMove) => {
  inputUser(userMove, computerMove);
  addMoveAndResultClasses();
};

document.querySelector('.rock')
  .addEventListener('click', () => handleClick('Rock', 'Scissors'));
document.querySelector('.paper')
  .addEventListener('click', () => handleClick('Paper', 'Rock'));
document.querySelector('.scissors')
  .addEventListener('click', () => handleClick('Scissors', 'Paper'));

document.querySelector('.reset-button')
  .addEventListener('click', () => {
    scoreDetails.Win = 0;
    scoreDetails.Lose = 0;
    scoreDetails.Tie = 0;
    localStorage.removeItem('Score');
    updateScore();
    document.querySelector('.container')
      .classList.remove('js-container');
  });

document.querySelector('.playAgainButton')
  .addEventListener('click', () => {
    document.querySelector('.container')
      .classList.remove('js-container');
  })



document.querySelector('.auto-play-btn').addEventListener('click', () => {
  autoPlay();
  addMoveAndResultClasses();
});



function updateScore() { 
  document.querySelector('.js-score-win')
  .innerHTML = `Win: ${scoreDetails.Win}`;
  document.querySelector('.js-score-lose')
  .innerHTML = `Lose: ${scoreDetails.Lose}`;
  document.querySelector('.js-score-tie')
  .innerHTML = `Tie: ${scoreDetails.Tie}`;
}

updateScore()

function computerGenerated() {
  const randomNum = Math.random();
  if (randomNum < 1/3) {
    return 'Rock';
  } else if (randomNum < 2/3) {
    return 'Paper';
  } else {
    return 'Scissors';
  }
}

function displayImage(move, element) {
  if (move === 'Rock') {
    element.innerHTML = '<img src="images/Rock.png" alt="Rock" >'
  } else if(move === 'Paper') {
    element.innerHTML = '<img src="images/Paper.png" alt="Paper" >'
  } else if (move === 'Scissors'){
    element.innerHTML = '<img src="images/Scissors.png" alt="Scissors">'
  }
} 

function result(playerMove, comMove){
  const playerMoveElement = document.querySelector('.js-playerMove')
  const computerMoveElement = document.querySelector('.js-computerMove')
  
  displayImage(playerMove, playerMoveElement);
  displayImage(comMove, computerMoveElement);

  document.querySelector('.js-playerMove-Title')
    .innerHTML = `${playerMove}<br>(You)`
  document.querySelector('.js-computerMove-Title')
    .innerHTML = `${comMove}<br>(Computer)`
  document.querySelector('.playAgainButton')
    .innerHTML = `<button>Play Again</button>`
}


function inputUser(playerMove, winMove) {
  let computerChoice = computerGenerated();
  const winElement = document.querySelector('.js-win');
  result(playerMove, computerChoice);
  if (computerChoice === winMove) {
    winElement.innerHTML = 'WIN!!!';
    scoreDetails.Win += 1;
  } else if (computerChoice === playerMove) {
    winElement.innerHTML = 'TIE!';
    scoreDetails.Tie += 1;
  } else {
    winElement.innerHTML = 'LOSE!!';
    scoreDetails.Lose +=1
  }

  localStorage.setItem('Score', JSON.stringify(scoreDetails));
  updateScore()
}


let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying){
     intervalID = setInterval(function() {
      const playerMove = computerGenerated();
      const winMoveObj = {Rock: 'Scissors', Paper: 'Rock', Scissors: 'Paper'};
      inputUser(playerMove, winMoveObj[playerMove]);
     }, 1400);
     isAutoPlaying = true;
     document.querySelector('.auto-play-btn').innerHTML = 'Stop Auto Play';
  } else {
      clearInterval(intervalID);
      isAutoPlaying = false;
      document.querySelector('.auto-play-btn').innerHTML = 'Auto Play';
  }
}

function displayRules() {
  var rulesElement = document.querySelector('.js-rules-container');
  rulesElement.innerHTML = `<ul>
  <span>Rules</span> 
  <li>Rock crushes Scissors (Rock wins against Scissors)</li>
  <li>Scissors cuts Paper (Scissors win against Paper)</li>
  <li>Paper covers Rock (Paper wins against Rock)</li>
  <li>If both players choose the same gesture, it's a tie, and the game is usually played again.</li>
  </ul>`
  rulesElement.classList.add('rulesContainer');   
  var rulesExitbutton = document.querySelector('.js-rules-exit');
  rulesExitbutton.innerHTML = '<a href="#title" onclick="exitRules()">Exit</a>';
}

function exitRules() {
  let rulesElement = document.querySelector('.js-rules-container');
  rulesElement.classList.remove('rulesContainer');
  rulesElement.innerHTML = "";
  let rulesExitButton = document.querySelector('.js-rules-exit')
  rulesExitButton.innerHTML = '';
}



