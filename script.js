let inputDir ={x : 0, y:0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio ('move.mp3');
const musicSound = new Audio ('music.mp3');
const Score = document.getElementById('score');
let cnt = 0;
const game_over = document.getElementById('game-ov');

let speed = 8;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [{
    x:9 , y:11
}]

food = {x :11 , y : 15 };


function main (ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)

    if((ctime -lastPaintTime) /1000 <1/speed ){
        return ;
    }
    lastPaintTime = ctime ;
    gameEngine();
}

function isCollide(snakeArr){
    // if you bump into yourself 
    for(let i = 1;  i<snakeArr.length; i++ ){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            // game_over.classList.add('showslide')
            return true;
        }
    }

    // if you bump into wall 
    if(snakeArr[0].x >= 20 || snakeArr[0].x <= 0 || snakeArr[0].y >= 20 ||  snakeArr[0].y <= 0  ){
        return true;
    }
    
}

function gameEngine(){
    // Part 1 : Updating the snake 

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0 , y: 0};
        alert("Game Over. Press any key for Play again ! ")
        snakeArr =[{x:13 , y :15}];
        musicSound.play();
        score = 0;
    }
/// when we eat
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x ){
    cnt = cnt+1;
    Score.innerHTML=`${cnt}`;
    foodSound.play();
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});

    let a = 1;
    let b = 19;
    food = {x: Math.round(a+(b-a) * Math.random()) , y : Math.round(a+(b-a) *Math.random() )};
}

  //Moving the snake 
  for(let i = snakeArr.length - 2 ; i>= 0; i-- ){
    //    const element = array[i];
       snakeArr[i+1] = {...snakeArr[i]};
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;



    // Part 2 : Display the snake  

    board.innerHTML = "";
    snakeArr.forEach((e,index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y; 
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0 ){
        snakeElement.classList.add('head');
        }else{
        snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    });

    // food 
    snakeArr.forEach((e,index) => {
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y; 
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    });


}





//Main logic 
window.requestAnimationFrame(main);
window.addEventListener('keydown' , e =>{
    inputDir = {x : 0 , y:1 } // Start Game 
    moveSound.play();
    
    switch(e.key){

        case "ArrowUp" :
          console.log("ArrowUp")
          inputDir.x = 0;
          inputDir.y = -1;
          break;
    
        case "ArrowDown" :
          console.log("ArrowDown")
          inputDir.x = 0;
          inputDir.y = 1;
          break;
    
        case "ArrowLeft" :
          console.log("ArrowLeft")
          inputDir.x= -1;
          inputDir.y = 0;
          break;
    
        case "ArrowRight" :
          console.log("ArrowRight")
          inputDir.x=1;
          inputDir.y=0;
          break;

        default : 
        break;
    }
})
