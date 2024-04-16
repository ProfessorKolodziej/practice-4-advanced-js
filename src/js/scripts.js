// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

const startBtn = document.querySelector('#js-start');

function goToNext() {
  const thisSection = this.closest('.rps-section');
	let nextSection = thisSection.nextElementSibling;

	if ( nextSection === null ) {
		nextSection = document.querySelector('#rps-intro');
	}

	thisSection.classList.toggle('show');
	nextSection.classList.toggle('show');
}

startBtn.addEventListener("click", goToNext);

// Random moves for the computer
const moves = [
	"rock",
	"paper",
	"scissors"
]

function randomMove() {
	const min = 0;
	const max = 2;
	const random = Math.round(Math.random() * (max - min) + min);
	return moves[random];
}

// Check who the winner is, if any
function checkWinner(playerMove, computerMove) {
	let winner = null;

	if ( playerMove === computerMove ) {
		/* Return null (no winner) immediately if it's a draw) */
		return winner;
	} 
	/* All win conditions for player */
	else if (
		(playerMove === "rock" && computerMove === "scissors") ||
		(playerMove === "paper" && computerMove === "rock") ||
		(playerMove === "scissors" && computerMove === "paper")
	) {
		winner = "player";
	} else {
		winner = "computer";
	}

	return winner;
}

let playerScore = 0,
		computerScore = 0;

// Update the results slide
function updateResultsSlide(playerMove, computerMove) {
	const winner = checkWinner(playerMove, computerMove);

	// Change the animation to show the chosen move
	const playerAnimation = document.querySelector('.rps-player');
	const computerAnimation = document.querySelector('.rps-computer');
	const resultText = document.querySelector('#current-result');

	// Reset the animation and wording to defaults while shaking
	playerAnimation.style.backgroundImage = `url("../images/rock.jpg")`;
	computerAnimation.style.backgroundImage = `url("../images/rock.jpg")`;
	resultText.innerText = "...";

	// Update results on the third shake
	setTimeout(function() {
		playerAnimation.style.backgroundImage = `url("../images/${playerMove}.jpg")`;
		computerAnimation.style.backgroundImage = `url("../images/${computerMove}.jpg")`;
		
		// Display "You Win", "You Lose", or "Draw" depending on who won
		if (winner === "player") {
			resultText.innerText = "You win";
			playerScore++;
		} else if (winner === "computer") {
			resultText.innerText = "You lose";
			computerScore++;
		} else {
			resultText.innerText = "Draw";
		}

		// Update the scores in the interface
		const playerScoreDisplay = document.querySelector('#rps-your-score');
		const computerScoreDisplay = document.querySelector('#rps-comp-score');

		playerScoreDisplay.innerText = playerScore;
		computerScoreDisplay.innerText = computerScore;
	}, 1200);

	// If either player made it to 3 points, update the page to say they won
	setTimeout(function() {
		const resultsContainer = document.querySelector('#rps-result');

		if ( playerScore === 3 ) {
			resultText.innerText = "You beat the computer!"
			resultsContainer.classList.add('end-result');
			playerScore = 0;
			computerScore = 0;
		} else if ( computerScore === 3 ) {
			resultText.innerText = "You did not beat the computer."
			resultsContainer.classList.add('end-result');
			playerScore = 0;
			computerScore = 0;
		}
	}, 2200);
}

// Event delegation lets us do the same event for a larger area,
// and we "delegate" - or check - if the element is a certain class
// to know if we want to go forward.

const moveSelect = document.querySelector('#js-moves');

function checkSelectedMove(event) {
	const selected = event.target;

	if (selected.classList.contains('rps-move')) {
		const playerMove = selected.firstElementChild.value;
		const computerMove = randomMove();
		goToNext.call(selected);
		updateResultsSlide(playerMove, computerMove);
	}
}

moveSelect.addEventListener("click", checkSelectedMove);

// Last event listener!
const tryAgainBtn = document.querySelector('#js-tryagain');
tryAgainBtn.addEventListener("click", goToNext);