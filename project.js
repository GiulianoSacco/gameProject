
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const obstacles1 = []
const obstacles2 = []
const obstacles3 = []
const collitions = []
let gameStatus = "gameOn"
let score = 0
document.getElementById('buttonbeast').style.visibility='hidden'
document.getElementById('buttonchill').style.visibility='hidden'
document.getElementById("instructions1").style.visibility="hidden"
document.getElementById("instructions1text").style.visibility="hidden"
document.getElementById("title").style.visibility="visible"
document.getElementById("instructions2").style.visibility="hidden"
document.getElementById("instructions2text").style.visibility="hidden"
document.getElementById("instructions2text2").style.visibility="hidden"
//const darkbackground = new Image();
//background.src = "./images/575ef1223c95837f7d17973d3217d61d.png"

const bird1 = new Image();
bird1.src = "images/realbird.png";
//const bird1 = new Image();
//background.src = "./images/bird1.jpg";
const smoke1 = new Image();
smoke1.src = "images/smoke.png";

const food1 = new Image();
food1.src = "images/food.png";

const hammer1 = new Image();
hammer1.src = "images/hammer.png";

const finishBad = new Image();
finishBad.src = "images/GAME OVER.png";

const finishGood = new Image();
finishGood.src = "images/HAPPYENDING.png";

class  Person{
    constructor(x, y, difficulty, gravity){
      this.x = x,
      this.y = y,
      this.w = 120,
      this.h = 120,
      this.speedJump = 100
      this.gravity = gravity
      this.color = "blue"
      this.difficulty = difficulty
    }
    draw(){
        ctx.drawImage(bird1,this.x,this.y,this.w,this.h)
        this.moveDown()
    }
    moveUp(){
        if(this.y > 1 && this.difficulty === "hard"){
        this.y -= this.speedJump
        }
    }
    moveDown(){
        if(this.y < canvas.height*0.7 - this.h -1 && this.difficulty === "hard"){
        this.y += this.gravity
        }
    }
    moveLeft(){
      if(this.x > 1 && this.difficulty === "easy"){
        this.x -= this.speedJump
        }
    }
    moveRight(){
      if(this.x < (canvas.width - 1) && this.difficulty === "easy"){
        this.x += this.speedJump
      }
    }
}
const newPers = new Person(190, canvas.height/2, "hard", 5)
const oldPers = new Person(700, canvas.height*0.65, "easy", 0)
//document.addEventListener("keydown", (spacebar) => {
    
    //if(spacebar.keyCode === 32){
     // newPers.moveUp()
    //} 
  //})


class Obstacles {
    constructor(x,y,h,w,color,difficulty, image){
      this.x = x,
      this.y = y,
      this.h = h,
      this.w = w,
      this.speed2 = 5,
      this.color = color,
      this.difficulty = difficulty
      this.image = image
    }
    drawLeft(){
      ctx.drawImage(this.image,this.x,this.y,this.w,this.h)
      this.obstacleMovesLeft()
    }
    
    drawDown(){
        ctx.drawImage(this.image,this.x,this.y,this.w,this.h)
        this.obstacleMovesDown()
    }
    obstacleMovesDown(){
        this.x -= this.speed2
    }

    obstacleMovesLeft(){
        this.y += 2
    }
  
    conditionMovesDown(){
      if(this.x > 0 && this.difficulty === "easy"){
         this.obstacleMovesDown()
      }
    }

    conditionMovesLeft(){
      if(this.y < (canvas.height - this.y - 1) && this.difficulty === "hard"){
        this.obstacleMovesLeft()
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
      const obstacle1 = new Obstacles(canvas.width, Math.floor(Math.random() * (canvas.height*0.4)), Math.floor(Math.random() * 200) + 100, 50,"blue", "hard", smoke1)
      obstacles1.push(obstacle1)
  },(time))

  setInterval(() => {
    const obstacle2 = new Obstacles( Math.floor(Math.random() * (canvas.width)), 0, 160, 160,"blue", "easy", food1)
    obstacles2.push(obstacle2)
  },(time))
  
  setInterval(() => {
    const obstacle3 = new Obstacles( Math.floor(Math.random() * (canvas.width)), 0, 60, 60,"red", "easy", hammer1)
    obstacles3.push(obstacle3)
  },(time))

  const checkCollitions = (obs, pers) => {
    return obs.contains(pers)
  }

  const drawScore = () => {
    ctx.fillStyle = "brown"
    ctx.font = "30px sans-serif"
    ctx.fillText(Math.floor(Math.round(score)), (canvas.width - 120) , 60)
  }

  const drawGameOver = () => {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    // background.onload = function(){
    //   ctx.drawImage(background,0,0,canvas.width,canvas.height);   
    //  }
    ctx.drawImage(finishBad,(canvas.width/2)-580, (canvas.height/2)-100)
    drawScore()
  }

  const happyTime = () => {
    ctx.drawImage(finishGood,10, (canvas.height/2)-100, 1500, 200)
    drawScore()
  }

  function update() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    // background.onload = function(){
    //   ctx.drawImage(background,0,0,canvas.width,canvas.height);   
    //  }
    drawScore()
    score++
    if (gameStatus === "finished") {
      drawGameOver()
      return
      
    }
  
    newPers.draw()
    obstacles1.forEach(obstacle1 => {
      if (obstacle1.x > 0) {
        obstacle1.drawDown()
        if (checkCollitions(obstacle1, newPers)) {
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
  document.getElementById("instructions1").style.visibility="visible"
  document.getElementById("instructions1text").style.visibility="visible"
  document.getElementById("instructions2").style.visibility="visible"
  document.getElementById("instructions2text").style.visibility="visible"
  document.getElementById("instructions2text2").style.visibility="visible"

  }

  function beast() {
  document.getElementById('buttonbeast').style.visibility='hidden'
  document.getElementById('buttonchill').style.visibility='hidden'
  document.getElementById("title").style.visibility="hidden"
  document.getElementById("instructions1").style.visibility="hidden"
  document.getElementById("instructions1text").style.visibility="hidden"
  document.getElementById("instructions2").style.visibility="hidden"
  document.getElementById("instructions2text").style.visibility="hidden"
  document.getElementById("instructions2text2").style.visibility="hidden"
  document.addEventListener("keydown", (spacebar) => {
    
      if(spacebar.keyCode === 32){
        newPers.moveUp()
      } 
    })
   
    update();  
   
  }
  
  function chillmode() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    drawScore()
    
    if(oldPers.h >= 1500){
      happyTime()
      return
     }
    oldPers.draw()
    obstacles2.forEach(obstacle2 => {
        obstacle2.drawLeft()

      if (checkCollitions(obstacle2, oldPers)) {
        oldPers.h += 0.3
        oldPers.w += 0.3
        oldPers.y -= 0.3
        score += 0.1
      }
    })
    obstacles3.forEach(obstacle3 => {
      obstacle3.drawLeft()
      
    if (checkCollitions(obstacle3, oldPers)) {
      oldPers.h -= 0.7
      oldPers.w -= 0.7
      oldPers.y -= 0.7
      score -= 1 
    }
  })
    if(score < 0){
      drawGameOver()
    }
    requestAnimationFrame(chillmode)
  }
  
  function chill() {
    
    document.getElementById('buttonbeast').style.visibility='hidden'
    document.getElementById('buttonchill').style.visibility='hidden'
    document.getElementById("title").style.visibility="hidden"
    document.getElementById("instructions1").style.visibility="visible"
    document.getElementById("instructions1text").style.visibility="visible"
    document.getElementById("instructions1").style.visibility="hidden"
    document.getElementById("instructions1text").style.visibility="hidden"
    document.getElementById("instructions2").style.visibility="hidden"
    document.getElementById("instructions2text").style.visibility="hidden"
    document.getElementById("instructions2text2").style.visibility="hidden"
    document.addEventListener("keydown", (rightArrow) => {
      if(rightArrow.keyCode === 39){    
        oldPers.moveRight()
      } 
    })
    document.addEventListener("keydown", (leftArrow) => {
      if(leftArrow.keyCode === 37){    
        oldPers.moveLeft()
      } 
    })
    
   
    chillmode();  

     
  }
  
  