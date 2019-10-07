const canvas = document.getElementById('my-canvas')
console.log(canvas);
const ctx = canvas.getContext('2d');
console.log(ctx);

background.style.display = "none";

const theWave = {
	x: 0,
	y: 0,
	draw(){
		let image = document.getElementById("background");
		ctx.drawImage(image, this.x, this.y)
	}
}
// theWave.draw()

const surfer = {
    x: 50,
    y: 200,
    width: 50,
	height: 50,
    // r: 50, <== Is this needed??  Possibly for collision?
    speed: 15,
    draw() {
    	let surfDude = document.getElementById("surfer");
		ctx.drawImage(surfDude, this.x, this.y)
    },
    //Add canvas restrictions here.  && 
    move(direction) {
        if (direction == "ArrowDown" && this.y < 319){
            this.y += this.speed;
        }
        if (direction == "ArrowUp" && this.y > 135){
            this.y -= this.speed;
        }
        if (direction == "ArrowLeft" && this.x > 5) {
            this.x -= this.speed;
        }
        if (direction == "ArrowRight" && this.x < 620) {
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
//surfer.draw()

// SHOULD THIS BE AN OBSTACLE CLASS INSTEAD?
const swimmer = {
	x: 725,
	y: 250,
	width: 50,
	height: 50,
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

//GAMEPLAY OBJECT
const gamePlay = {
	time: 0,
	start: function(){
		theWave.draw()
		//This is Temporary
		alert('Ready To Get Amped?')
		surfer.draw()
	}
	



}
gamePlay.start()


//LISTENERS
document.addEventListener('keydown', (event) => {
    surfer.move(event.key)
}),
document.getElementById("animation").addEventListener('click', (event) => {
	animate()
}
) 

