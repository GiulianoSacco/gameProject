
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const obstacles1 = []
const obstacles2 = []
const obstacles3 = []
const obstacles4 = []
const obstacles5 = []
const obstacles6 = []
const obstacles7 = []
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
document.getElementById("reset").style.visibility="hidden"


//const darkbackground = new Image();
//background.src = "./images/575ef1223c95837f7d17973d3217d61d.png"

const bird1 = new Image();
bird1.src = "images/realbird.png";
//const bird1 = new Image();
//background.src = "./images/bird1.jpg";
const enemy1 = new Image();
enemy1.src = "images/enemy.png";

const enemy2 = new Image();
enemy2.src = "images/enemy.png";

const enemy3 = new Image();
enemy3.src = "images/enemy.png";

const food1 = new Image();
food1.src = "images/fries.png";

const fruit1 = new Image();
fruit1.src = "images/apple.png";

const fruit2 = new Image();
fruit2.src = "images/water.png";

const fruit3 = new Image();
fruit3.src = "images/cherry.png"

const finishBad = new Image();
finishBad.src = "images/GAME OVER.png";

const finishGood = new Image();
finishGood.src = "images/HAPPYENDING.png";

const jump = new sound("sounds/jumpp.wav")

const lose = new sound("sounds/lost.wav")

const wrongfruit = new sound("sounds/wrong.wav")

const winn = new sound("sounds/win.wav")

const yum = new sound("sounds/good.wav")





class  Person{
    constructor(x, y, difficulty, gravity){
      this.x = x,
      this.y = y,
      this.w = 120,
      this.h = 120,
      this.speedJump = 75
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
        jump.play()
        }
    }
    moveDown(){
        if(this.y < (canvas.height*0.65) && this.difficulty === "hard"){
        this.y += this.gravity
        }
    }
    moveLeft(){
      if(this.x > 1 && this.difficulty === "easy"){
        this.x -= this.speedJump
        }
    }
    moveRight(){
      if(this.x < (canvas.width - this.w - 1) && this.difficulty === "easy"){
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
      this.speed2 = 10,
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
      return (this.x + 50 < b.x + b.w) &&
        (this.x + this.w > b.x + 50) &&
        (this.y + 50 < b.y + b.h) &&
        (this.y + this.h > b.y + 50)
    }
  }
  
  let time = 1500
  
  const checkCollitions = (obs, pers) => {
    return obs.contains(pers)
  }

  const drawScore = () => {
    ctx.fillStyle = "brown"
    ctx.font = "bold 30px Courier New"
    ctx.fillText(Math.floor(Math.round(score)), (canvas.width - 200) , 60)
  }

  const drawGameOver = () => {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    document.getElementById("canvas").style = "./images/background.jpg"
    ctx.drawImage(finishBad,(canvas.width/2)-580, (canvas.height/2)-250)
    document.getElementById("reset").style.visibility="visible"

  }

  const happyTime = () => {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    document.getElementById("canvas").style = "./images/background.jpg)"
    ctx.drawImage(finishGood,10, (canvas.height/2)-270, 1500, 200)
    document.getElementById("reset").style.visibility="visible"
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
      ctx.font = "bold 40px Courier New";
      ctx.fillText(`SCORE:${score}`, ((canvas.width / 2)+305), 300);
      return
      
    }
  
    newPers.draw()
    obstacles1.forEach(obstacle1 => {
      if (obstacle1.x > 0) {
        obstacle1.drawDown()
        if (checkCollitions(obstacle1, newPers)) {
          gameStatus = "finished"
          lose.play()
        }
      }
    })
    obstacles5.forEach(obstacle5 => {
      if (obstacle5.x > 0) {
        obstacle5.drawDown()
        if (checkCollitions(obstacle5, newPers)) {
          gameStatus = "finished"
          lose.play()
        }
      }
    })
    obstacles6.forEach(obstacle6 => {
      if (obstacle6.x > 0) {
        obstacle6.drawDown()
        if (checkCollitions(obstacle6, newPers)) {
          gameStatus = "finished"
          lose.play()
        }
      }
    })
    requestAnimationFrame(update)
  }

  function sound (src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
    this.sound.play();
    };
    this.stop = function(){
    this.sound.pause();
    };
    }

  function resetgame(){
    window.location.reload()
  
  }

  function purrbaddie() {
  ctx.clearRect(0,0,canvas.width, canvas.height)
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
  ctx.clearRect(0,0,canvas.width, canvas.height)
  document.getElementById("canvas").style = "./images/wp8483094.jpg"
  document.getElementById('buttonbeast').style.visibility='hidden'
  document.getElementById('buttonchill').style.visibility='hidden'
  document.getElementById("title").style.visibility="hidden"
  document.getElementById("instructions1").style.visibility="hidden"
  document.getElementById("instructions1text").style.visibility="hidden"
  document.getElementById("instructions2").style.visibility="hidden"
  document.getElementById("instructions2text").style.visibility="hidden"
  document.getElementById("instructions2text2").style.visibility="hidden"
  setInterval(() => {
    const obstacle1 = new Obstacles(canvas.width, Math.floor(Math.random() * 480), 70, 70,"blue", "hard", enemy1)
    obstacles1.push(obstacle1)
  },(3000))

  setInterval(() => {
    const obstacle5 = new Obstacles(canvas.width, Math.floor(Math.random() * 480), 70, 70,"blue", "hard", enemy2)
    obstacles5.push(obstacle5)
  },(6000))

  setInterval(() => {
    const obstacle6 = new Obstacles(canvas.width, Math.floor(Math.random() * 480), 70, 70,"blue", "hard", enemy3)
    obstacles6.push(obstacle6)
  },(1000))

  setInterval(() => {
    const obstacle1 = new Obstacles(canvas.width, Math.floor(Math.random() * 480), 70, 70,"blue", "hard", enemy1)
    obstacles1.push(obstacle1)
  },(5000))

  setInterval(() => {
    const obstacle5 = new Obstacles(canvas.width, Math.floor(Math.random() * 480), 70, 70,"blue", "hard", enemy2)
    obstacles5.push(obstacle5)
  },(10000))

  setInterval(() => {
    const obstacle6 = new Obstacles(canvas.width, Math.floor(Math.random() * 480), 70, 70,"blue", "hard", enemy3)
    obstacles6.push(obstacle6)
  },(15000))

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
    if(score >= 100){
      happyTime()
      winn.play()
      return
     }
     
    oldPers.draw()
    obstacles2.forEach(obstacle2 => {
      if (obstacle2.y < canvas.height*0.68) {
        obstacle2.drawLeft()
      
      if (checkCollitions(obstacle2, oldPers)) {
        oldPers.h += 0.05
        oldPers.w += 0.05
        oldPers.y -= 0.05
        score += 0.3
        yum.play()
      }}
    })
    obstacles3.forEach(obstacle3 => {
      if (obstacle3.y < canvas.height*0.68) {
        obstacle3.drawLeft()
      
    if (checkCollitions(obstacle3, oldPers)) {
      oldPers.h -= 0.01
      oldPers.w -= 0.01
      oldPers.y += 0.01
      score -= 0.6
      wrongfruit.play()
    }}
  })

    obstacles4.forEach(obstacle4 => {
      if (obstacle4.y < canvas.height*0.68) {
        obstacle4.drawLeft()
      
    if (checkCollitions(obstacle4, oldPers)) {
      oldPers.h -= 0.01
      oldPers.w -= 0.01
      oldPers.y += 0.01
      score -= 0.6
      wrongfruit.play()
    }}
  })


  obstacles5.forEach(obstacle5 => {
    if (obstacle5.y < canvas.height - obstacles5.y - 1) {
      obstacle5.drawLeft()
    
  if (checkCollitions(obstacle5, oldPers)) {
    oldPers.h -= 0.01
    oldPers.w -= 0.01
    oldPers.y += 0.01
    score -= 0.6
    wrongfruit.play()

  }}
})





    if(score < 0){
      drawGameOver()
      lose.play()
      return
    }
    requestAnimationFrame(chillmode)
  }
  
  function chill() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
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
    setInterval(() => {
      const obstacle2 = new Obstacles( Math.floor(Math.random() * (canvas.width - 50)), 0, 60, 60,"blue", "easy", food1)
      obstacles2.push(obstacle2)
    },(1500))
    
    setInterval(() => {
      const obstacle3 = new Obstacles( Math.floor(Math.random() * (canvas.width -50)), 0, 80, 80,"red", "easy", fruit1)
      obstacles3.push(obstacle3)
    },(1700))

    setInterval(() => {
      const obstacle4 = new Obstacles( Math.floor(Math.random() * (canvas.width - 50)), 0, 100, 100,"red", "easy", fruit2)
      obstacles4.push(obstacle4)
    },(1600))

    setInterval(() => {
      const obstacle4 = new Obstacles( Math.floor(Math.random() * (canvas.width - 50)), 0, 100, 100,"red", "easy", fruit3)
      obstacles4.push(obstacle4)
    },(1400))

    setInterval(() => {
      const obstacle3 = new Obstacles( Math.floor(Math.random() * (canvas.width -50)), 0, 80, 80,"red", "easy", fruit1)
      obstacles3.push(obstacle3)
    },(10000))

    setInterval(() => {
      const obstacle4 = new Obstacles( Math.floor(Math.random() * (canvas.width - 50)), 0, 100, 100,"red", "easy", fruit2)
      obstacles4.push(obstacle4)
    },(11000))

    setInterval(() => {
      const obstacle4 = new Obstacles( Math.floor(Math.random() * (canvas.width - 50)), 0, 100, 100,"red", "easy", fruit3)
      obstacles4.push(obstacle4)
    },(12000))

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