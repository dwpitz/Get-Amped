//This code hides HTML elements required for canvas on the page.
background.style.display = "none";
document.getElementById("surfer").style.visibility = "hidden";
document.getElementById("swimmer").style.visibility = "hidden";
document.getElementById("seal").style.visibility = "hidden";
document.getElementById("jelly").style.visibility = "hidden";
document.getElementById("shark").style.visibility = "hidden";
//Canvas implementation
const canvas = document.getElementById('my-canvas')
const ctx = canvas.getContext('2d');

//The obstacle class.  Obstacles are are randomly instantiated with different types.  Also, their y axis is determined at random as well, which creates staggered deployment into the gamespace.  The move function also fluctuates the objects speed.   
class Obstacle {
    constructor() {
        const animalPossibilities = ["swimmer", "seal", "jelly", "shark"];
        this.type = animalPossibilities[Math.floor(Math.random() * animalPossibilities.length)];
        this.x = 735;
        this.y = Math.floor(Math.random() * 250) + 100;
        this.width = 50;
        this.height = 50;
    }

    draw() {
        let image = document.getElementById(this.type)
        ctx.drawImage(image, this.x, this.y);
    }

    move() {
        this.x -= Math.floor(Math.random() * 10) + 4;
    }

}
//This object is the background image on the canvas
const theWave = {
    x: 0,
    y: 0,
    draw() {
        let image = document.getElementById("background");
        ctx.drawImage(image, this.x, this.y)
    }
}
//The hero object.
const surfer = {
    x: 50,
    y: 150,
    width: 50,
    height: 50,
    speed: 50,
    index: null,
    draw() {
        let surfDude = document.getElementById("surfer");
        ctx.drawImage(surfDude, this.x, this.y)
    },
//How the surfer navigates the game.
    move(direction) {
        if (direction == "ArrowDown" && this.y < 300) {
            this.y += this.speed;
        }
        if (direction == "ArrowUp" && this.y > 80) {
            this.y -= this.speed;
        }
        if (direction == "ArrowLeft" && this.x > 5) {
            this.x -= this.speed;
        }
        if (direction == "ArrowRight" && this.x < 620) {
            this.x += this.speed;
        }
    },
//The collision function checks all around the surfer's space on the grid.  If any coordinates overlap a collision is detected.  
    checkCollision() {
        let index = null
        for (let i = 0; i < gamePlay.animals.length; i++) {
            let collide = gamePlay.animals[i];
            if (
                this.x + this.width > collide.x &&
                this.x < collide.x + collide.width &&
                collide.y < this.y + this.height &&
                collide.y + collide.height > this.y
            ) {
                index = i
                break;
            }
        }
//This is where various points, depending on the obstacle type are determined
        this.index = index
        if (index !== null && gamePlay.animals[this.index].type === "swimmer") {
            gamePlay.stokeLevel = gamePlay.stokeLevel - 1;

        }
        if (index !== null && gamePlay.animals[this.index].type === "seal") {
            gamePlay.stokeLevel = gamePlay.stokeLevel - 3;

        }
        if (index !== null && gamePlay.animals[this.index].type === "jelly") {
            gamePlay.stokeLevel = gamePlay.stokeLevel - 2;
        }
        if (index !== null && gamePlay.animals[this.index].type === "shark") {
            gamePlay.stokeLevel = gamePlay.stokeLevel - 4;
        }
        if (index !== null) {
            gamePlay.animals.splice(index, 1)
        }
    }
}
theWave.draw();


//GAMEPLAY OBJECT containes the start function, the game timer, display, draw, and move functions
const gamePlay = {
    time: 0,
    stokeLevel: 10,
    animals: [],
    start: function() {
        theWave.draw();
        animate()
        gamePlay.timer()
        theWave.draw();
        surfer.draw()

    },
//The timer function handles gametime as well as the timed deployment of obstacles into the game environment.  It is also responsible for the win/lose
    timer: function() {
        const rideTime = setInterval(() => {
            this.time++
            this.printStats();
            const o = new Obstacle();
            gamePlay.animals.push(o)
            // }

            if (this.time % 10 === 0) {
                this.stokeLevel++
                this.printStats();
            }

            if (this.stokeLevel <= 0) {
                clearInterval(rideTime)
                cancelAnimationFrame(animationPower)
                callLossModal()
            }

            if (this.stokeLevel >= 15) {
                clearInterval(rideTime)
                cancelAnimationFrame(animationPower)
                callVictoryModal()
            }

        }, 1000);
    },

    printStats: function() {
        const timer = document.getElementById("ride-time");
        timer.textContent = this.time
        const stokeLevel = document.getElementById("stoke-level");
        stokeLevel.textContent = (`         ${this.stokeLevel}`)
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

    gamePlay.moveAnimals()
    clearCanvas();
    theWave.draw();
    surfer.draw();
    gamePlay.drawAnimals()
    surfer.checkCollision();
    animationPower = window.requestAnimationFrame(animate)
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.height, canvas.width)
}

function callLossModal() {
    let modal = document.getElementById("myLoss");
    let span = document.getElementsByClassName("closeLoss")[0];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function callVictoryModal() {
    let modal = document.getElementById("myWin");
    let span = document.getElementsByClassName("closeWin")[0];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


document.getElementById("start").addEventListener('click', (event) => {
    gamePlay.start();
});

document.addEventListener('keydown', (event) => {
    surfer.move(event.key)
});

document.getElementById("myBtnLoss").addEventListener('click', (event) => {
    gamePlay.time = 0;
    gamePlay.stokeLevel = 10;
    let modal = document.getElementById("myLoss");
    modal.style.display = "none";
    gamePlay.start();

})

document.getElementById("myBtnWin").addEventListener('click', (event) => {
    gamePlay.time = 0;
    gamePlay.stokeLevel = 10;
    let modal = document.getElementById("myWin");
    modal.style.display = "none";
    gamePlay.start();

})