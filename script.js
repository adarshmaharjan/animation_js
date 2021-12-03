// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// eslint-disable-next-line no-multi-assign
const width = (canvas.width = window.innerWidth);
// eslint-disable-next-line no-multi-assign
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};
// let testBall = new Ball(50, 100, 4, 4, 'blue', 10)

// console.log(testBall.x)
// console.log(testBall.size)
// console.log(testBall.color)
// testBall.draw()
const balls = [];

Ball.prototype.update = function () {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }
  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }
  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }
  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }
  this.x += this.velX;
  this.y += this.velY;
};
Ball.prototype.collisionDetection = function () {
  for (let j = 0; j < balls.length; j += 1) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.size + balls[j].size) {
        // eslint-disable-next-line no-multi-assign
        balls[j].color = this.color = `rgb(${random(0, 255)},${random(
          0,
          255
        )},${random(0, 255)})`;
      }
    }
  }
};

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
    size
  );
  balls.push(ball);
}
function loop() {
  ctx.fillStyle = `rgba(0,0,0,0.25)`;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i += 1) {
    balls[i].draw();
    balls[i].update();
    // balls[i].collisionDetect()
  }
  requestAnimationFrame(loop);
}
loop();
