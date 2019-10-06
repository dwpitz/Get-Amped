const canvas = document.getElementById('my-canvas')
console.log(canvas);

const ctx = canvas.getContext('2d');
console.log(ctx);

let image = document.getElementById("my image");
ctx.drawImage(image, 0, 0, )

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.height, canvas.width)
	ctx.drawImage(image, 0, 0, )
}

// backgroundWave();

const surfer = {
    x: 360,
    y: 330,
    r: 25,
    color: "red",
    speed: 10,
    surferImage(){
  //   	surfDude = document.getElementById("surfer");
		// ctx.drawImage(surfDude, 0, 0, )
    },
    draw() {
    	surfDude = document.getElementById("surfer");
		ctx.drawImage(surfDude, this.x, this.y)
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.r, 0, Math.PI);
        // ctx.fillStyle = this.color;
        // ctx.fill();
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
        this.draw();
    }
}
surfer.draw()

document.addEventListener('keydown', (event) => {
    // console.log(event);
    surfer.move(event.key)
})