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

// Event delegation lets us do the same event for a larger area,
// and we "delegate" - or check - if the element is a certain class
// to know if we want to go forward.

const moveSelect = document.querySelector('#js-moves');

moveSelect.addEventListener("click", function(event) {
	if (event.target.classList.contains('rps-move')) {
		//console.log(event.target);
		goToNext.call(event.target);
	}
});

// Last event listener!
const tryAgainBtn = document.querySelector('#js-tryagain');
tryAgainBtn.addEventListener("click", goToNext);