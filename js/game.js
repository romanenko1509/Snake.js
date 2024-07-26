const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const groundImg = new Image();
groundImg.src = "/Snake.js/images/ground.png";

const foodImg = new Image();
foodImg.src = "/Snake.js/images/food.png";

let box = 32;
let score = 0;
let direction = null;

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
}

const handleKeyDown = (event) => {
  switch (event.keyCode) {
    case 37: // LEFT ARROW
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case 38: // UP ARROW
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case 39: // RIGHT ARROW
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case 40: // DOWN ARROW
      if (direction !== "up") {
        direction = "down";
      }
      break;
  }
}

document.addEventListener("keydown", event => handleKeyDown(event));

const eatTail = (head, arr) => {
  for(let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) {
      clearInterval(game);
    }
  }
}

const drawGame = () => {
  ctx.drawImage(groundImg, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#004700" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 3, box * 1.75);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };
  } else {
    snake.pop();
  }

  if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17) {
    clearInterval(game);
  }
  
  switch(direction) {
    case "left": 
      snakeX -= box;
      break;
    case "right":
      snakeX += box;
      break;
    case "up":
      snakeY -= box;
      break;
    case "down":
      snakeY += box;
      break;
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

const game = setInterval(drawGame, 150);
