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

// Update the results slide
function updateResultsSlide(playerMove, computerMove) {
	console.log("Player move is:", playerMove);
	console.log("Computer move is:", computerMove);
	const winner = checkWinner(playerMove, computerMove);
	console.log(winner);
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