// Game Constants and variables
let inputDirection = { x: 0, y: 0 };
const foodSound = new Audio("food2.mp3");
const gameOver = new Audio("gameover.mp3");
const buzzer = new Audio("buzzer.mp3");
const move = new Audio("move.mp3");
const board = document.getElementById("board");
let lastPainTime = 0;
let speed = 8;
let score = 0;
let snakeArr = [{ x: 12, y: 13 }];
food = { x: 6, y: 7 };
// inputDirection = { x: 0, y: 0 };

// Game Functions
function main(cTime) {
  window.requestAnimationFrame(main);
  if ((cTime - lastPainTime) / 1000 < 1 / speed) {
    return;
  }
  lastPainTime = cTime;
  console.log(cTime);
  gameEngine();
}
function isCollide(snake) {
  //if the snake bumps into itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  //if the snake bumps into the wall
  if (
    snake[0].x >= 20 ||
    snake[0].x <= 0 ||
    snake[0].y >= 20 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  //PART 1 : Updating the SNAKE Array and Food
  if (isCollide(snakeArr)) {
    buzzer.play();
    // gameOver.play();
    inputDirection = { x: 0, y: 0 };
    alert("Game Over, Press any Key to play");
    snakeArr = [{ x: 10, y: 10 }];
    score = 0;
  }
  // If you have eaten the food , update the snake and regenerate food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDirection.x,
      y: snakeArr[0].y + inputDirection.y,
    });
    score += 1;
    document.getElementById("score").innerHTML = `Score : ${score}`;
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the snake (lines 72 & 77 CAN BE REMOVED)
  if (!isCollide(snakeArr)) {
    for (let i = snakeArr.length - 2; i >= 0; i--) {
      snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;
  }

  //PART 2: Display the snake and food

  //display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }

    board.appendChild(snakeElement);
    console.log(food);
  });

  //Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
//Main Logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDirection = { x: 0, y: 1 };
  move.play();
  switch (e.key) {
    case "ArrowUp":
      inputDirection.x = 0;
      inputDirection.y = -1;
      console.log("ArrowUp");
      break;
    case "ArrowDown":
      inputDirection.x = 0;
      inputDirection.y = 1;
      console.log("ArrowDown");
      break;
    case "ArrowLeft":
      inputDirection.x = -1;
      inputDirection.y = 0;
      console.log("ArrowLeft");
      break;
    case "ArrowRight":
      inputDirection.x = 1;
      inputDirection.y = 0;
      console.log("ArrowRight");
      break;
    default:
      break;
  }
});
