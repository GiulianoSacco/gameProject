
const canvas = document.getElementById('canvas');
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext('2d');
const obstacles = []
gameStatus = "playing"

class  Person{
    constructor(){
      this.x = 40,
      this.y = canvas.height / 2,
      this.w = 70,
      this.h = 70,
      this.speedJump = 300
      this.gravity = 5
      this.color = "grey"
    }
    draw(){
        ctx.fillRect(this.x, this.y, this.w, this.h)
        this.moveDown()
    }
    moveUp(){
        if(this.y > 1){
        this.y -= this.speedJump
        }
    }
    moveDown(){
        if(this.y < canvas.height - this.h -1){
        this.y += this.gravity
        }
    }
}
const newPers = new Person()

document.addEventListener("keydown", (spacebar) => {
    
    if(spacebar.keyCode === 32){
      newPers.moveUp()
    } 
  })


class Obstacles {
    constructor(){
      this.x = canvas.width,
      this.y = Math.floor(Math.random() * 300),
      this.w = 50,
      this.h = Math.floor(Math.random() * 500) + 200,
      this.speed2 = 5,
      this.color = "brown"
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
  
  let time = 2000
  
  setInterval(() => {
    const obstacle = new Obstacles()
    obstacles.push(obstacle)
  },(time))
  
  const checkCollitions = (obs, pers) => {
    return obs.contains(pers)
  }


  function update() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    
    if (gameStatus === "finished") {
      return
    }
  
    newPers.draw()
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
update()