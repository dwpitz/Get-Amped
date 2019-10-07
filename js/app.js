const canvas = document.getElementById('my-canvas')
console.log(canvas);

const ctx = canvas.getContext('2d');
console.log(ctx);



let image = document.getElementById("background");
ctx.drawImage(image, 0, 0, )

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.height, canvas.width)
	ctx.drawImage(image, 0, 0, )
	ctx.drawImage(surfDude, this.x, this.y)
}

let x = 0;
function animate(){
	console.log(++x)
	swimmer.move();
	clearCanvas();
	swimmer.draw();
	window.requestAnimationFrame(animate)
}

// backgroundWave();

const surfer = {
    x: 190,
    y: 200,
    r: 50,
    speed: 15,
    draw() {
    	surfDude = document.getElementById("surfer");
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
        //THIS IS BAD. GET THIS OUT OF THE SURFER
        clearCanvas()
        this.draw();
        swimmer.draw();
    }
}
surfer.draw()

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
        this.draw();
	}
}
swimmer.draw()

document.addEventListener('keydown', (event) => {
    // console.log(event);
    surfer.move(event.key)
})

