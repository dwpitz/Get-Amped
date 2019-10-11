background.style.display = "none";
document.getElementById("surfer").style.visibility = "hidden";
document.getElementById("swimmer").style.visibility = "hidden";
document.getElementById("seal").style.visibility = "hidden";
document.getElementById("jelly").style.visibility = "hidden";
document.getElementById("shark").style.visibility = "hidden";


const canvas = document.getElementById('my-canvas')
console.log(canvas);
const ctx = canvas.getContext('2d');
console.log(ctx);

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
    y: 150,
    width: 50,
    height: 50,
    speed: 50,
    index: null,
    draw() {
        let surfDude = document.getElementById("surfer");
        ctx.drawImage(surfDude, this.x, this.y)
    },

    move(direction) {
        if (direction == "ArrowDown" && this.y < 315) {
            this.y += this.speed;
        }
        if (direction == "ArrowUp" && this.y > 70) {
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
                index = i
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
        theWave.draw();
        animate()
        gamePlay.timer()
        theWave.draw();
        surfer.draw()

    },

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
                console.log('You LOSE');
                callModal()
                




            }
            if (this.stokeLevel >= 15) {
                clearInterval(rideTime)
                cancelAnimationFrame(animationPower)
                console.log('You LOSE');
                alert("Bruh, you lost...BA")

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

function callModal(){
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


//LISTENERS
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
gamePlay.start();