
const canvas = document.getElementById('canvas');
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext('2d');
const obstacles = []
let gameStatus = "gameOn"
let score = 0
document.getElementById('buttonbeast').style.visibility='hidden'
document.getElementById('buttonchill').style.visibility='hidden'

const background = new Image();
background.src = "./images/background.jpg";

const bird1 = new Image();
background.src = "./images/bird1.jpg";
class  Person{
    constructor(y, difficulty, gravity){
      this.x = 190,
      this.y = y,
      this.w = 70,
      this.h = 70,
      this.speedJump = 100
      this.gravity = gravity
      this.color = "blue"
      this.difficulty = difficulty
    }
    draw(){
        ctx.fillRect(this.x, this.y, this.w, this.h)
        this.moveDown()
    }
    moveUp(){
        if(this.y > 1 && this.difficulty === "hard"){
        this.y -= this.speedJump
        }
        else if(this.y > 1 && this.difficulty === "easy"){
          this.x += this.speedJump
        }
    }
    moveDown(){
        if(this.y < canvas.height*0.7 - this.h -1){
        this.y += this.gravity
        }
    }
}
const newPers = new Person(canvas.height/2, "hard", 5)
const oldPers = new Person(canvas.height*0.70, "easy", 0)
//document.addEventListener("keydown", (spacebar) => {
    
    //if(spacebar.keyCode === 32){
     // newPers.moveUp()
    //} 
  //})


class Obstacles {
    constructor(){
      this.x = canvas.width,
      this.h = Math.floor(Math.random() * 300) + 100
      this.y = Math.floor(Math.random() * (canvas.height*0.8 - this.h)),
      this.w = 50,
      
      this.speed2 = 5,
      this.color = "blue"
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
        this.obstacleMoves()
      }
    
    obstacleMoves(){
      this.x -= this.speed2  
    }
  
    conditionMoves(){
      if(this.x > 0){
         this.obstacleMoves()
      }
    }
    contains(b){
      return (this.x < b.x + b.w) &&
        (this.x + this.w > b.x) &&
        (this.y < b.y + b.h) &&
        (this.y + this.h > b.y)
    }
  }
  
  let time = 1500
  
  setInterval(() => {
    const obstacle = new Obstacles()
    obstacles.push(obstacle)
  },(time))
  
  const checkCollitions = (obs, pers) => {
    return obs.contains(pers)
  }

  const drawScore = () => {
    ctx.fillStyle = "brown"
    ctx.font = "30px sans-serif"
    ctx.fillText(score, (canvas.width - 120) , 60)
  }

  const drawGameOver = () => {
    ctx.fillStyle = "red"
    ctx.font = "100px sans-serif"
    ctx.fillText("GAME OVER", (canvas.width/2)-350, (canvas.height/2))
  }

  const happyTime = () => {
    ctx.fillStyle = "red"
    ctx.font = "100px sans-serif"
    ctx.fillText("CONGRATULATIONS", (canvas.width/2)-350, (canvas.height/2))
  }

  const title = () => {
    ctx.fillStyle = "black"
    ctx.font = "150px sans-serif"
    ctx.fillText("LIFE OF BIRDIE", (canvas.width/2)-550, 200)
  }

  function update() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    background.onload = function(){
      ctx.drawImage(background,0,0,canvas.width,canvas.height);   
     }
    drawScore()
    if (gameStatus === "finished") {
      drawGameOver()
      return
      
    }
  
    newPers.draw()
    score++
    obstacles.forEach(obstacle => {
      if (obstacle.x > 0) {
        obstacle.draw()
        if (checkCollitions(obstacle, newPers)) {
          gameStatus = "finished"
        }
      }
    })
    requestAnimationFrame(update)
  }


  
  function purrbaddie() {
  document.getElementById('buttoni').style.visibility='hidden'
  document.getElementById('buttonbeast').style.visibility='visible'
  document.getElementById('buttonchill').style.visibility='visible'

  }

  function beast() {
  document.getElementById('buttonbeast').style.visibility='hidden'
  document.getElementById('buttonchill').style.visibility='hidden'
  document.addEventListener("keydown", (spacebar) => {
    
      if(spacebar.keyCode === 32){
        newPers.moveUp()
      } 
    })
   
    update();  
   
  }
  
  function chillmode() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    if(oldPers.x >= canvas.width){
      happyTime()
      return
     }
    oldPers.draw()
    requestAnimationFrame(chillmode)
  }
  
  function chill() {
    
    document.getElementById('buttonbeast').style.visibility='hidden'
    document.getElementById('buttonchill').style.visibility='hidden'
    document.addEventListener("keydown", (spacebar) => {
    
      if(spacebar.keyCode === 32){
        oldPers.moveUp()
      } 
    })
   
    chillmode();  
   
  }
  
  title()
  