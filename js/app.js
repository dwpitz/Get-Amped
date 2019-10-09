const canvas = document.getElementById('my-canvas')
console.log(canvas);
const ctx = canvas.getContext('2d');
console.log(ctx);

background.style.display = "none";

//OBJECTS
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
            //this checks to see if we've collided with any corner/side of a thing  
            this.x + this.width > randomAnimal.x &&
            this.x < randomAnimal.x + randomAnimal.width &&
            randomAnimal.y < this.y + this.height &&
            randomAnimal.y + randomAnimal.height > this.y
        ) {
            console.log("collision");
        //     return true
        //     if(randomAnimal === swimmer){
        //     	gamePlay.stokeLevel = gamePlay.stokeLevel - 2;
        //     } else if (randomAnimal === seal){
        //     	gamePlay.stokeLevel = gamePlay.stokeLevel - 4;
        //     } else if (randomAnimal === shark){
        //     	gamePlay.stokeLevel = gamePlay.stokeLevel - 4;
        //     } else if (randomAnimal === jelly){
        //     	gamePlay.stokeLevel = gamePlay.stokeLevel - 3;
        //     }
        // } else return false;
    },
}
//surfer.draw()

// SHOULD THIS BE AN OBSTACLE CLASS INSTEAD?
const swimmer = {
    x: 725,
    y: Math.floor(Math.random() * 100) + 225,
    width: 50,
    height: 50,
    draw() {
        const swimmer = document.getElementById("swimmer");
        ctx.drawImage(swimmer, this.x, this.y)
    },
    move() {
        this.x -= 2;
    },
}

const seal = {
    x: 725,
    y: Math.floor(Math.random() * 100) + 225,
    width: 50,
    height: 50,
    draw() {
        const seal = document.getElementById("seal");
        ctx.drawImage(seal, this.x, this.y)
    },
    move() {
        this.x -= 2;
    },
}

const jelly = {
    x: 725,
    y: Math.floor(Math.random() * 100) + 225,
    width: 50,
    height: 50,
    draw() {
        const jellyfish = document.getElementById("jellyfish");
        ctx.drawImage(jellyfish, this.x, this.y)
    },
    move() {
        this.x -= 2;
    },
}

const shark = {
    x: 725,
    y: Math.floor(Math.random() * 100) + 225,
    width: 50,
    height: 50,
    draw() {
        const shark = document.getElementById("shark");
        ctx.drawImage(shark, this.x, this.y)
    },
    move() {
        this.x -= 2;
    },
}

//You gotta stow this away somewhere....
let marineLife = [swimmer, seal, jelly, shark]
let randomAnimal = marineLife[Math.floor(Math.random() * marineLife.length)]


//FUNCTIONS
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.height, canvas.width)
}

function animate() {
    clearCanvas();
    theWave.draw();
    surfer.draw();
    
    // game.drawAnimals()

    randomAnimal.move()
    randomAnimal.draw();

    surfer.checkCollision(randomAnimal);
    window.requestAnimationFrame(animate)
}

//GAMEPLAY OBJECT
const gamePlay = {
    time: 0,
    stokeLevel: 10,
    animals: []

    start: function() {
        gamePlay.timer()
        theWave.draw();
        alert('Ready To Get Amped?') //<======Temporary...should ultimately be a DOM element
        surfer.draw()
        //swimmer.draw()
        //animate() <==== Do this later...
    },

    timer: function() {
        const rideTime = setInterval(() => {
            this.time++
            this.printStats();
			const arbTime = Math.floor(Math.random() * 3 + 1)

			// generate new animal
			// 
            // if (this.time % arbTime === 0) {
            //     randomAnimal = marineLife[Math.floor(Math.random() * marineLife.length)]
            // }


        }, 1000);
    },

    printStats: function() {
        const timer = document.getElementById("ride-time");
        timer.textContent = this.time
    }

    drawAnimals: function() {

    }
}

gamePlay.start()

//LISTENERS
document.addEventListener('keydown', (event) => {
    surfer.move(event.key)
})
document.getElementById("animation").addEventListener('click', (event) => {
    animate()
})