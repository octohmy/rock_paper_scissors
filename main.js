const options = document.querySelectorAll('.option');
const playerScoreDisplay = document.querySelector('#player-score');
const computerScoreDisplay = document.querySelector('#computer-score');
const tieScoreDisplay = document.querySelector('#tie-score');
const resultDisplay = document.querySelector('#result');
const playAgainButton = document.querySelector('#play-again');
const farewellDisplay = document.querySelector('#farewell');


const computerChoiceText = document.getElementById('computer-choice-text');
const computerChoiceValue = document.getElementById('computer-choice-value');



let playerScore = 0;
let computerScore = 0;
let tieScore = 0;

options.forEach(option => {
  option.addEventListener('click', function() {
    playRound(option.id);
  });
});




function playRound(playerSelection) {
  const computerSelection = getComputerSelection();
  const result = getResult(playerSelection, computerSelection);

 // Set the emoji of player and computer choice
 const emojis = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️'
};

const playerEmoji = emojis[playerSelection];
const computerEmoji = emojis[computerSelection];
const choicesText = `${playerEmoji} + ${computerEmoji} =`;

// Update the choices element
const choicesDisplay = document.querySelector('#choices');
choicesDisplay.textContent = choicesText;



  if (result === 'win') {
    playerScore++;
    playerScoreDisplay.textContent = playerScore;
  } else if (result === 'lose') {
    computerScore++;
    computerScoreDisplay.textContent = computerScore;
  } else {
    tieScore++;
    tieScoreDisplay.textContent = tieScore;
  }

  resultDisplay.textContent = result.toUpperCase();


   // Hide the computer choice value
   computerChoiceValue.style.opacity = 0;

   // Set the new computer choice value
   setTimeout(() => {
     computerChoiceValue.textContent = computerSelection;
     computerChoiceValue.style.opacity = 1;
     computerChoiceValue.classList.remove('shake');
     void computerChoiceValue.offsetWidth;
     computerChoiceValue.classList.add('shake');
   }, 500);



  if (playerScore >= 5 || computerScore >= 5) {
    endGame();
  }

  // remove class after animation completes
  setTimeout(() => {
    computerChoiceValue.classList.remove('shake');
  }, 1500);
}





function getComputerSelection() {
  const options = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return options[randomIndex];
}




function getResult(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return 'tie';
  } else if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    return 'win';
  } else {
    return 'lose';
  }
}

function endGame() {
  if (playerScore > computerScore) {
    farewellDisplay.textContent = "Congratulations! You're lucky.";
  } else if (playerScore < computerScore) {
    farewellDisplay.textContent = "Better luck next time.";
  } else {
    farewellDisplay.textContent = "It's a tie.";
  }

  playAgainButton.style.display = 'block';
  options.forEach(option => {
    option.disabled = true;
  });
}

playAgainButton.addEventListener('click', function() {
  playerScore = 0;
  computerScore = 0;
  tieScore = 0;

  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
  tieScoreDisplay.textContent = tieScore;
  resultDisplay.textContent = '';

  playAgainButton.style.display = 'none';
  options.forEach(option => {
    option.disabled = false;
  });

  farewellDisplay.textContent = '';
});

document.addEventListener('mousemove', function(event) {
  const x = Math.floor(event.clientX / window.innerWidth * 255);
  const y = Math.floor(event.clientY / window.innerHeight * 255);
  document.body.style.background = `linear-gradient(to right, rgb(${x}, ${y}, 150), rgb(${y}, ${x}, 150))`;
});


