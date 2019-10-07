const canvas = document.getElementById('my-canvas')
console.log(canvas);
const ctx = canvas.getContext('2d');
console.log(ctx);



const theWave = {
	x: 0,
	y: 0,
	draw(){
		let image = document.getElementById("background");
		ctx.drawImage(image, this.x, this.y)
	}
}
theWave.draw()

const surfer = {
    x: 50,
    y: 200,
    width: 25,
	height: 25,
    // r: 50, <== Is this needed??  Possibly for collision?
    speed: 15,
    draw() {
    	let surfDude = document.getElementById("surfer");
		ctx.drawImage(surfDude, this.x, this.y)
    },
    move(direction) {
        if (direction == "ArrowDown") {
            this.y += this.speed;
        }
        if (direction == "ArrowUp") {
            this.y -= this.speed;
        }
        if (direction == "ArrowLeft") {
            this.x -= this.speed;
        }
        if (direction == "ArrowRight") {
            this.x += this.speed;
        }
        clearCanvas()
    },

    checkCollision(swimmer) {
    if(
    	//this checks to see if we've collided with any corner/side of a thing  
    	this.x + this.width > swimmer.x &&
      	this.x < swimmer.x + swimmer.width &&
      	swimmer.y < this.y + this.height && 
      	swimmer.y + swimmer.height > this.y
      	) {
      console.log("collision");
      return true
    }
    else return false;
  },
}
surfer.draw()

// SHOULD THIS BE AN OBSTACLE CLASS INSTEAD?
const swimmer = {
	x: 725,
	y: 250,
	width: 25,
	height: 25,
	// r: 50, <== Is this needed??  Possibly for collision?
	draw() {
		const swimmer = document.getElementById("swimmer");
		ctx.drawImage(swimmer, this.x, this.y)
	},
	move() {
		this.x -= 1;
		clearCanvas()

	},
}
swimmer.draw()

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.height, canvas.width)
	theWave.draw();
	surfer.draw();
	swimmer.draw();
}

function animate(){
	swimmer.move();
	surfer.checkCollision(swimmer);
	clearCanvas();
	window.requestAnimationFrame(animate)
}
// animate()

//LISTENERS
document.addEventListener('keydown', (event) => {
    surfer.move(event.key)
}),
document.addEventListener('click', (event) => {
	animate()
}
) 

background.style.display = "none";
