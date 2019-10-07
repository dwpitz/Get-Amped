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
    x: 190,
    y: 200,
    r: 50,
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
    }
}
surfer.draw()

// SHOULD THIS BE AN OBSTACLE CLASS INSTEAD?
const swimmer = {
	x: 550,
	y: 250,
	r: 50,
	draw() {
		const swimmer = document.getElementById("swimmer");
		ctx.drawImage(swimmer, this.x, this.y)
		// this.draw();
	},
	move() {
		this.x -= 1;
		clearCanvas()

	}
}
swimmer.draw()

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.height, canvas.width)
	theWave.draw();
	surfer.draw();
	swimmer.draw();
	// ctx.drawImage(theWave.draw(), 0, 0, )
	// ctx.drawImage(surfer.draw(), this.x, this.y)
}

function animate(){
	let x = 0;
	// console.log(++x)
	swimmer.move();
	clearCanvas();
	swimmer.draw();
	surfer.draw();
	window.requestAnimationFrame(animate)
}

//Listeners
document.addEventListener('keydown', (event) => {
    surfer.move(event.key)
})

