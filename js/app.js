const canvas = document.getElementById('my-canvas')
console.log(canvas);
const ctx = canvas.getContext('2d');
console.log(ctx);

background.style.display = "none";

//OBJECTS
class Obstacle {

    constructor() {
        const animalPossibilities = ["swimmer", "seal", "jelly", "shark"];
        this.id = animalPossibilities[Math.floor(Math.random() * animalPossibilities.length)];
        this.x = 735;
        this.y = Math.floor(Math.random() * 100) + 225;
        this.width = 50;
        this.height = 50;
        
    }

    draw() {
    	let image = document.getElementById(this.id)
        ctx.drawImage(image, this.x, this.y);
    }

    move() {
    	this.x -= Math.floor(Math.random() * 3) + 1;
    }

}

const theWave = {
    x: 0,
    y: 0,
    draw() {
        let image = document.getElementById("background");
        ctx.drawImage(image, this.x, this.y)
    }
}

const surfer = {
    x: 50,
    y: 200,
    width: 50,
    height: 50,
    speed: 20,
    draw() {
        let surfDude = document.getElementById("surfer");
        ctx.drawImage(surfDude, this.x, this.y)
    },

    move(direction) {
        if (direction == "ArrowDown" && this.y < 319) {
            this.y += this.speed;
        }
        if (direction == "ArrowUp" && this.y > 135) {
            this.y -= this.speed;
        }
        if (direction == "ArrowLeft" && this.x > 5) {
            this.x -= this.speed;
        }
        if (direction == "ArrowRight" && this.x < 620) {
            this.x += this.speed;
        }
    },

    checkCollision(randomAnimal) {
        if (
            this.x + this.width > randomAnimal.x &&
            this.x < randomAnimal.x + randomAnimal.width &&
            randomAnimal.y < this.y + this.height &&
            randomAnimal.y + randomAnimal.height > this.y
        ) {
            console.log("collision");
            return true
        } else {
            return false;
        }
    }
}

//Collision stuff...
//     if(randomAnimal === swimmer){
//     	gamePlay.stokeLevel = gamePlay.stokeLevel - 2;
//     } else if (randomAnimal === seal){
//     	gamePlay.stokeLevel = gamePlay.stokeLevel - 4;
//     } else if (randomAnimal === shark){
//     	gamePlay.stokeLevel = gamePlay.stokeLevel - 4;
//     } else if (randomAnimal === jelly){
//     	gamePlay.stokeLevel = gamePlay.stokeLevel - 3;
//surfer.draw()

//GAMEPLAY OBJECT
const gamePlay = {
    time: 0,
    stokeLevel: 10,
    animals: [],
    start: function() {
        gamePlay.timer()
        theWave.draw();
        // alert('Ready To Get Amped?') //<======Temporary...should be a DOM element soon
        surfer.draw()
        // animate() <==== Do this later...
    },

    timer: function() {
        const rideTime = setInterval(() => {
            this.time++
            this.printStats();

            // const arbTime = Math.floor(Math.random() * 3 + 1)
            // if (this.time % 5 === 0) {
                const o = new Obstacle();
                gamePlay.animals.push(o)
            // }

        }, 1000);
    },

    printStats: function() {
        const timer = document.getElementById("ride-time");
        timer.textContent = this.time
    },

    drawAnimals: function() {
	    for (let i = 0; i < this.animals.length; i++) {
    		this.animals[i].draw();
	    }
    },

    moveAnimals: function(){
    	for (let i = 0; i < this.animals.length; i++) {
    		this.animals[i].move();
    	}	

    // gamePlay.animals[1].move()
	}
}

function animate() {
    gamePlay.moveAnimals()
    clearCanvas();
    theWave.draw();
    surfer.draw();
    gamePlay.drawAnimals()
    // surfer.checkCollision(randomAnimal);
    window.requestAnimationFrame(animate)
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.height, canvas.width)
}



gamePlay.start();

//LISTENERS
document.addEventListener('keydown', (event) => {
    surfer.move(event.key)
});
document.getElementById("animation").addEventListener('click', (event) => {
    animate()
});