const board = document.querySelector('.board');
const blockHeight = 50;
const blockWidth = 50;

let btnDifficulty = document.querySelector('.btn-difficulty')

const startButton = document.querySelector('.btn-start')
const modal = document.querySelector('.modal')

const startGameModal = document.querySelector('.start-game')

const restartButton = document.querySelector('.btn-restart')
const gameOverModal = document.querySelector('.game-over')

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

const highScoreElement = document.querySelector('.high-score')
const scoreElement = document.querySelector('.score')
// const timeElement = document.querySelector('.time')

let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = highScore;
let score = 0;
// let time = `00-00`
let intervalId = null;
let food = {x: Math.floor(Math.random()*rows), y: Math.floor(Math.random()*cols)}
blocks = []


let snake = [
    {
        x:1,y:3
    },{
        x:1,y:4
    },{
        x:1,y:5
    }
]

let direction = 'left'




// for (let i = 0; i < rows*cols; i++) {
//     const block = document.createElement('div');
//     block.classList.add('block');
//     board.appendChild(block);  
// }

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block); 
        // block.innerText = `${row}-${col}`
        blocks[`${row}-${col}`] = block
    }
    
}


function render(){
    let head = null;

    blocks[`${food.x}-${food.y}`].classList.add("food")

    if (direction === "left"){
        head = {x : snake[0].x, y: snake[0].y-1}
    }
    else if (direction === "right"){
        head = {x : snake[0].x, y: snake[0].y+1}
    }
    else if (direction === "down"){
        head = {x : snake[0].x+1, y: snake[0].y}
    }
    else if (direction === "up"){
        head = {x : snake[0].x-1, y: snake[0].y}
    }

    if(head.x<0 || head.x >=rows || head.y < 0 || head.y >= cols){
        // alert("game over")
        clearInterval(intervalId)
        modal.style.display = "flex"
        startGameModal.style.display = "none"
        gameOverModal.style.display = "flex"
        return;
    }

    if(head.x == food.x && head.y == food.y){
        snake.unshift(head);
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = {x: Math.floor(Math.random()*rows), y: Math.floor(Math.random()*cols)}
        blocks[`${food.x}-${food.y}`].classList.add("food")
        score++;
        scoreElement.innerText = score
        if (score>highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }


    }

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill')
    });

    snake.unshift(head)
    snake.pop()
    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.add('fill')
    })
}

// intervalId = setInterval(() => {
    
//     render()
// }, 400);

startButton.addEventListener("click", ()=>{
    modal.style.display = "none"
    intervalId = setInterval(() => {
    
    render()
}, 300);
})




restartButton.addEventListener("click", restartGame)




function restartGame() {

  blocks[`${food.x}-${food.y}`].classList.remove('food');

  snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}` ].classList.remove('fill');
  });

  score = 0;
//   time = `00-00`
  scoreElement.innerText = score;
  highScoreElement.innerText = highScore;
//   timeElement.innerText = time;


  modal.style.display = 'none';
  direction = "down"

  snake = [
    {
        x:1,y:3
    },{
        x:1,y:4
    },{
        x:1,y:5
    }
]

  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };

  intervalId = setInterval(() => {
    render();
  }, 300);
  
}




addEventListener("keydown", (e)=>{
    if(e.key=="ArrowUp"){
        direction = "up"
    }
    else if(e.key=="ArrowDown"){
        direction = "down"
    }
    else if(e.key=="ArrowRight"){
        direction = "right"
    }
    else if(e.key=="ArrowLeft"){
        direction = "left"
    }
})


btnDifficulty.addEventListener("click", difficulty)
function difficulty() {
    intervalId = setInterval(() => {
    render();
  }, 200);
}