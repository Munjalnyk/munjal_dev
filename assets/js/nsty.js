const slider = document.querySelector('.slider');
const ball = document.querySelector('.ball');
const sliderWidth = slider.offsetWidth;
const ballSize = ball.offsetWidth;
const maxBallPosition = sliderWidth - ballSize;
let ballPosition = 0;
let ballDirection = 'right';

function moveBall() {
	if (ballDirection === 'right') {
		ballPosition += 5;
		if (ballPosition >= maxBallPosition) {
			ballDirection = 'left';
		}
	} else if (ballDirection === 'left') {
		ballPosition -= 5;
		if (ballPosition <= 0) {
			ballDirection = 'right';
		}
	}
	ball.style.left = ballPosition + 'px';
	
	if (ball.offsetTop + ballSize >= slider.offsetTop) {
		gameOver();
	} else {
		requestAnimationFrame(moveBall);
	}
}

function gameOver() {
	alert('Game Over!');
}

requestAnimationFrame(moveBall);
