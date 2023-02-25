const ball = document.getElementById("ball");
const slider = document.getElementById("slider");
let ballPosition = 0;
let moveBall;

function moveSlider(event) {
  const container = document.getElementById("container");
  const containerWidth = container.offsetWidth;
  const sliderWidth = slider.offsetWidth;
  const sliderPosition = event.clientX - container.offsetLeft - sliderWidth / 2;
  const maxPosition = containerWidth - sliderWidth;

  if (sliderPosition < 0) {
    slider.style.left = "0";
  } else if (sliderPosition > maxPosition) {
    slider.style.left = maxPosition + "px";
  } else {
    slider.style.left = sliderPosition + "px";
  }
}

function moveBallDown() {
  ballPosition += 1;
  ball.style.top = ballPosition + "px";

  if (ballPosition > (document.getElementById("container").offsetHeight - ball.offsetHeight)) {
    clearInterval(moveBall);
    alert("Game Over!");
  }
}

document.addEventListener("mousemove", moveSlider);

document.addEventListener("mousedown", function() {
  moveBall = setInterval(moveBallDown, 10);
});

document.addEventListener("mouseup", function() {
  clearInterval(moveBall);
});
