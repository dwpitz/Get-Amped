const canvas = document.getElementById('my-canvas')
console.log(canvas);
const ctx = canvas.getContext('2d');
console.log(ctx);

background.style.display = "none";

//OBJECTS
class Obstacle {

    constructor() {
        const animalPossibilities = ["swimmer", "seal", "jelly", "shark"];
        this.type = animalPossibilities[Math.floor(Math.random() * animalPossibilities.length)];
        this.x = 735;
        this.y = Math.floor(Math.random() * 100) + 225;
        this.width = 50;
        this.height = 50;
    }

    draw() {
        let image = document.getElementById(this.type)
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
    speed: 50,
    index: null,
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

    checkCollision() {
        //This will work unless surfer collides with 2 animals at the exact same instant  
        let index = null
        for (let i = 0; i < gamePlay.animals.length; i++) {
            let collide = gamePlay.animals[i];
            if (
                this.x + this.width > collide.x &&
                this.x < collide.x + collide.width &&
                collide.y < this.y + this.height &&
                collide.y + collide.height > this.y
            ) {
                console.log("Collision!")
                index = i
                console.log(index)
                break;

            }

        }

        this.index = index
        if (index !== null && gamePlay.animals[this.index].type === "swimmer") {
            gamePlay.stokeLevel = gamePlay.stokeLevel - 1;
            console.log(gamePlay.stokeLevel)
        }
        if (index !== null && gamePlay.animals[this.index].type === "seal") {
            gamePlay.stokeLevel = gamePlay.stokeLevel - 3;
            console.log(gamePlay.stokeLevel)
        }
        if (index !== null && gamePlay.animals[this.index].type === "jelly") {
            gamePlay.stokeLevel = gamePlay.stokeLevel - 2;
            console.log(gamePlay.stokeLevel)
        }
        if (index !== null && gamePlay.animals[this.index].type === "shark") {
            gamePlay.stokeLevel = gamePlay.stokeLevel - 4;
            console.log(gamePlay.stokeLevel)
        }
        if (index !== null) {
            gamePlay.animals.splice(index, 1)
        }
    }
}

theWave.draw();
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
        // animate() //<==== Do this later...
    },

    timer: function() {
        const rideTime = setInterval(() => {
            this.time++
            this.printStats();

            // const arbTime = Math.floor(Math.random() * 3 + 1)
            if (this.time % 2 === 0) {
                const o = new Obstacle();
                gamePlay.animals.push(o)
            }

            if (this.time % 10 === 0){
            	this.stokeLevel++
            	this.printStats();
            }

            if (this.stokeLevel <= 0) {
    			console.log('You LOSE');
    			
    			// document.getElementById("my-canvas").src = "https://media.giphy.com/media/2FSr2rzHyCvUA/giphy.mp4"


    	}
    		if(this.stokeLevel >= 15) {
    			console.log('You WIN')
    	}

        }, 1000);
    },

    printStats: function() {
        const timer = document.getElementById("ride-time");
        timer.textContent = this.time
        const stokeLevel = document.getElementById("stoke-level");
        stokeLevel.textContent = (`Stoke Level:  ${this.stokeLevel}`)
    },

    drawAnimals: function() {
        for (let i = 0; i < this.animals.length; i++) {
            this.animals[i].draw();
        }
    },

    moveAnimals: function() {
        for (let i = 0; i < this.animals.length; i++) {
            this.animals[i].move();
        }
    },
}

function animate() {
    //surfer.checkCollision();
    gamePlay.moveAnimals()
    clearCanvas();
    theWave.draw();
    surfer.draw();
    gamePlay.drawAnimals()
    surfer.checkCollision();
    window.requestAnimationFrame(animate)
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.height, canvas.width)
}


//LISTENERS
document.addEventListener('keydown', (event) => {
    surfer.move(event.key)
});
document.getElementById("animation").addEventListener('click', (event) => {
    gamePlay.start();
    animate()
});