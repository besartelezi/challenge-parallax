const canvas = document.getElementById("canvas");

// variable that calls on the context of the selected canvas
// getContext is a built-in function that only works for canvas
const canvasContext = canvas.getContext('2d');

//set in all caps because this is a global variable
//the global width needs to be the same as the width you selected in the css
const CANVAS_WIDTH = canvas.width = 960;
const CANVAS_HEIGHT = canvas.height = 600;

let gameSpeed = 1;
//interval between obstacles appearing
//TODO: create a function that changes the obstacleInterval randomly, when score system is implemented = implement this feature
let obstacleInterval = 1000;

//adds new Images
const backgroundLayer1 = new Image();
backgroundLayer1.src = "resources/game-images/01-sky.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "resources/game-images/02-sea.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "resources/game-images/03-lapras.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "resources/game-images/04-clouds.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "resources/game-images/05-trees.png";
const backgroundLayer6 = new Image();
backgroundLayer6.src = "resources/game-images/06-grass.png";

//adding images of the Pokémon of the trainer
const torchicImage = new Image();
torchicImage.src = "resources/game-images/torchic.png";
const treeckoImage = new Image();
treeckoImage.src = "resources/game-images/treecko.png";
const mudkipImage = new Image();
mudkipImage.src = "resources/game-images/mudkip.png";

//adding images of obstacle Pokémon
const ivysaurImage = new Image();
ivysaurImage.src = "resources/game-images/ivysaur.png";
const zigzagoonImage = new Image();
zigzagoonImage.src = "resources/game-images/zigzagoon.png";
const squirtleImage = new Image();
squirtleImage.src = "resources/game-images/squirtle.png";
const charizardImage = new Image();
charizardImage.src = "resources/game-images/charizard.png";

//adding images of attacks
const fireAttackImage = new Image();
fireAttackImage.src = "resources/game-images/fire-attack.png"
const waterAttackImage = new Image();
waterAttackImage.src = "resources/game-images/water-attack.png"
const grassAttackImage = new Image();
grassAttackImage.src = "resources/game-images/grass-attack.png"

//Pokémon typings
//grass beats water, water beats fire, fire beats grass, and none of them beat normal
const grass = "grass";
const fire = "fire";
const water = "water";
const normal = "normal";

//the users status, if the users pokémon is hit, they lose
let hasUserLost = false;
//The text of the button, it changes depending on if the user has just started the game, or if they're trying again
let buttonText = "Start Game!";

//Points the user has, shown on the HTML
let showUserFirePoints = document.getElementById("fire-points");
let showUserGrassPoints = document.getElementById("grass-points");
let showUserWaterPoints = document.getElementById("water-points");
let showUserTotalPoints = document.getElementById("total-points");

//creating a class so I don't have to write the code for all the different layers
class ParallaxBackgroundLayer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 1920;
        this.height = 600;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update() {
        this.speed = gameSpeed * this.speedModifier
        if (this.x <= -this.width){
            //this is the formula needed to get rid of whitespace in between the looped images
            //there will always be a gap equal to the gamespeed, and if the canvas_width isn't perfectly divisible by the gameSpeed, another gap will appear
            //This way it won't matter what the gamespeed is, there won't be a gap in between the images in the canvas
            this.x = this.width + this.x2 - this.speed
        }
        if (this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed

        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw () {
        //draws the images on the canvas
        canvasContext.drawImage(this.image, this.x, this.y, this.width, this.height)
        canvasContext.drawImage(this.image, this.x2, this.y, this.width, this.height)
    }
}
//starting position of the Pokémon
let currentX = 15;
let currentY = 250;

class UserPokemon {
    //passing only elements that will change depending on the new UserPokemon I create in the constructor
    constructor(name, image, type, width, height) {
        this.image = image;
        this.type = type;
        this.x = currentX;
        this.y = currentY;
        this.width = width;
        this.height = height;
        this.image = image;
        this.speed = 5;
    }
}

class ObstaclePokemon {
    constructor(name, img, type, width, height, speed) {
        this.img = img;
        this.type = type;
        this.width = width;
        this.height = height;
        //needs to be hardcoded, so it will always appear on the far right of the screen
        this.x = 950;
        //picks a random y coordinate that's still inside of the canvas
        this.y = Math.random() * (canvas.height - 125);
        this.speed = speed;
    }
    update() {
        this.x -= this.speed;
    }
    draw () {
        //draws obstacle Pokémon on the canvas
        canvasContext.drawImage(this.img ,this.x, this.y, this.width, this.height)
    }
}

class pokemonAttack {
    constructor(img, type, width, height, speed) {
        this.img = img;
        this.type = type;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.x = currentPokemon.x + currentPokemon.width/2 + 10;
        this.y = currentPokemon.y + currentPokemon.height/2 - 10;
    }
    update() {
        this.x += this.speed;
    }
    draw() {
        canvasContext.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

//draws Pokémon on the canvas
function drawPokemon (img, pokemonX, pokemonY, pokemonWidth, pokemonHeight) {
    canvasContext.drawImage(img, pokemonX, pokemonY, pokemonWidth, pokemonHeight)
}

//creates new UserPokemon
const treecko = new UserPokemon("Treecko", treeckoImage, grass, 98, 100);
const torchic = new UserPokemon("Torchic" , torchicImage, fire, 67, 100);
const mudkip = new UserPokemon("Mudkip" , mudkipImage, water, 95, 100);
//The current Pokémon the user has, this is a let variable since I want the user to be able to switch to different Pokemon
let currentPokemon = treecko;

let grassPoints = 0;
let firePoints = 0;
let waterPoints = 0;
let totalPoints = 0;

//creating all the layers in the parallax
const layerSky = new ParallaxBackgroundLayer(backgroundLayer1, 0.25)
const layerSea = new ParallaxBackgroundLayer(backgroundLayer2, 1.5)
const layerLapras = new ParallaxBackgroundLayer(backgroundLayer3, 2.5)
const layerClouds = new ParallaxBackgroundLayer(backgroundLayer4, 0.25)
const layerTrees = new ParallaxBackgroundLayer(backgroundLayer5, 3.5)
const layerGrass = new ParallaxBackgroundLayer(backgroundLayer6, 6)

//Array of all layers, instead of calling functions on each object, use for each to call the update and draw functions on them all
const layerArray = [layerSky, layerSea, layerLapras, layerClouds, layerTrees, layerGrass]
//array for pressed keys
let keys = [];
//array of obstacle Pokémon
let obstacleArray = [];
//array of Pokémon attacks
const pokemonAttacksArray = [];

function animateGame () {
    if (hasUserLost === false) {
        //clears prior drawing on the canvas
        canvasContext.clearRect(0, 0,  CANVAS_WIDTH, CANVAS_HEIGHT)
        //call on the update and draw functions on each of the layers
        layerArray.forEach(layer => {
            layer.update();
            layer.draw();
        })
        //draws current Pokémon
        //used current Pokémon variable because I want to re-use this function for all Pokémon the user has
        drawPokemon(currentPokemon.image, currentPokemon.x, currentPokemon.y, currentPokemon.width, currentPokemon.height, currentPokemon.x, currentPokemon.y);
        //calls move pokemon function
        movePokemon();
        animateAttack();
        animateObstacles();
        requestAnimationFrame(animateGame);
    }
    else {
        return;
    }
}

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
})
window.addEventListener('keyup', (e) => {
    delete keys[e.key];
})

//moving the user's Pokémon
function movePokemon () {
    //added '&&' so the users pokemon can't leave the screen
    if (keys["ArrowUp"] && currentPokemon.y > 0) {
        //created this if statement, so that all the x and y values of all Pokémon will stay the same
        if (currentPokemon === torchic) {
            currentPokemon.y -= currentPokemon.speed;
            treecko.y -= treecko.speed;
            mudkip.y -= mudkip.speed;
        }
        if (currentPokemon === treecko) {
            currentPokemon.y -= currentPokemon.speed;
            torchic.y -= torchic.speed;
            mudkip.y -= mudkip.speed;
        }
        if (currentPokemon === mudkip){
            currentPokemon.y -= currentPokemon.speed;
            torchic.y -= torchic.speed;
            treecko.y -= treecko.speed;
        }
    }
    if (keys["ArrowDown"] && currentPokemon.y < 500) {
        if (currentPokemon === torchic) {
            currentPokemon.y += currentPokemon.speed;
            treecko.y += treecko.speed;
            mudkip.y += mudkip.speed;
        }
        if (currentPokemon === treecko) {
            currentPokemon.y += currentPokemon.speed;
            torchic.y += torchic.speed;
            mudkip.y += mudkip.speed;
        }
        if (currentPokemon === mudkip) {
            currentPokemon.y += currentPokemon.speed;
            torchic.y += torchic.speed;
            treecko.y += treecko.speed;
        }
    }
    if (keys[" "]) {
        shootAttack();
    }
    if (keys["a"]) {
        currentPokemon = treecko;
    }
    if (keys["z"]) {
        currentPokemon = mudkip;
    }
    if (keys["e"]) {
        currentPokemon = torchic;
    }
}

//variables needed for attack delay
//TODO: set AttackDelay as a property for every other Pokémon, so every Pokémon has different Attack Speed
let attackDelay = 500;
let lastClick = 0;

//checks what Pokémon the user has currently selected, and adds that types attack to the array
function shootAttack () {
    if (lastClick >= (Date.now() - attackDelay))
        return;
    lastClick = Date.now();
    if (currentPokemon.type === fire) {
        pokemonAttacksArray.push(new pokemonAttack(fireAttackImage, fire, 28, 31, 5));
    }
    if (currentPokemon.type === water) {
        pokemonAttacksArray.push(new pokemonAttack(waterAttackImage, water, 28, 31, 5));
    }
    if (currentPokemon.type === grass) {
        pokemonAttacksArray.push(new pokemonAttack(grassAttackImage, grass, 28, 31, 5));
    }
}

function animateAttack () {
    //removes attacks from array when they leave screen
    pokemonAttacksArray.forEach((attack, index) => {
        attack.draw();
        attack.update();
        if ((attack.x + attack.width) >=1000) {
            setTimeout(() => {
                pokemonAttacksArray.splice(index, 1);
            }, 0)
        }
        //checks for collision between attack and obstacle
        obstacleArray.forEach((obstacle, obstacleIndex) => {
            if (attack.x < obstacle.x + obstacle.width &&
                attack.x + attack.width > obstacle.x &&
                attack.y < obstacle.y + obstacle.height &&
                attack.y + attack.height > obstacle.y) {
                //checks if type advantage of attack is present
                if (attack.type === fire && obstacle.type === grass ||
                    attack.type === water && obstacle.type === fire ||
                    attack.type === grass && obstacle.type === water
                ) {
                    //if attack is effective against obstacle type, remove obstacle and attack
                    setTimeout(() => {
                        obstacleArray.splice(obstacleIndex, 1);
                        pokemonAttacksArray.splice(index, 1);
                    }, 0)
                    //adding point to pokemon type
                    //TODO: if the obstacle Pokémon is shiny, give a 10* multiplier to that point
                    if (attack.type === fire) {
                        firePoints++;
                        totalPoints++;
                        showUserFirePoints.innerHTML = firePoints;
                        showUserTotalPoints.innerHTML = totalPoints;
                    }
                    if (attack.type === water) {
                        waterPoints++;
                        totalPoints++;
                        showUserWaterPoints.innerHTML = waterPoints;
                        showUserTotalPoints.innerHTML = totalPoints;

                    }
                    if (attack.type === grass) {
                        grassPoints++;
                        totalPoints++;
                        showUserGrassPoints.innerHTML = grassPoints;
                        showUserTotalPoints.innerHTML = totalPoints;

                    }
                }
                else {
                    setTimeout(() => {
                        //if attack isn't effective against enemy obstacle type, remove attack
                        pokemonAttacksArray.splice(index, 1);
                    }, 0)
                }
            }});
    });
}

//gives a random value, can do to 100 to work in percentages
let randomNumber;
function randomValue () {
    randomNumber = Math.round(Math.random() * 3);
}

//according to a random value, spawn an obstacle Pokémon
function generateObstacles () {
    //TODO: expand math random and add other Pokémon Obstacles
    randomValue();
    console.log(obstacleArray)
    if (randomNumber === 0) {
        obstacleArray.push(new ObstaclePokemon("Zigzagoon" ,zigzagoonImage, normal, 136, 100, 1));
    }
    if (randomNumber === 1){
        obstacleArray.push(new ObstaclePokemon("Ivysaur", ivysaurImage, grass, 153, 150, 2))
    }
    if (randomNumber === 2) {
        obstacleArray.push(new ObstaclePokemon("Squirtle" ,squirtleImage, water, 97, 100, 2));
    }
    //TODO add more Pokémon, once more have been added, update spawn rate
    if (randomNumber === 3) {
        obstacleArray.push(new ObstaclePokemon("Charizard" ,charizardImage, fire, 153, 165, 2));
    }

    // stops generating obstacles when user has lost
    if (hasUserLost === true) {
        obstacleArray = [];
        return
    }
    else if (hasUserLost === false) {
        setTimeout(generateObstacles, obstacleInterval);
    }
}

function animateObstacles () {
    obstacleArray.forEach((obstacle, index) => {
        obstacle.draw();
        obstacle.update();
        //removes items from array when they leave screen
        if ((obstacleArray[index].x + obstacleArray[index].width) <=0) {
            setTimeout(() => {
                obstacleArray.splice(index, 1);
            }, 0)
        }
        //detects collision between player and obstacles
        //TODO: rework hitboxes (I probably won't do this though)
        if (currentPokemon.x < obstacle.x + obstacle.width &&
            currentPokemon.x + currentPokemon.width > obstacle.x &&
            currentPokemon.y < obstacle.y + obstacle.height &&
            currentPokemon.y + currentPokemon.height > obstacle.y)
        {
            handleLoss();
        }
    });
}

function createStartButton () {
    //this creates the start button
    let startButton = document.createElement("button");
    startButton.setAttribute("id", "startButton");
    startButton.textContent = buttonText;
    document.getElementById("canvas-box").appendChild(startButton);

    //styling of start game button
    startButton.style.backgroundColor = "#1a2c2c";
    startButton.style.width = "200px";
    startButton.style.height = "50px";
    startButton.style.color = "white";
    startButton.style.borderStyle = "solid";
    startButton.style.borderWidth = "3px";
    startButton.style.position = "absolute";
    startButton.style.left = "40%";
    startButton.style.top = "45%";

    //if the user has just started playing, the button will say "start game" and it will have all default values
    if (hasUserLost === false) {
        startButton.onclick = () => {
            startGame();
            startButton.remove();
        }
    }
    //if the user wants to play again, this gets called, and all values will be set back to default values
    else {
        startButton.onclick = () => {
            // clears canvas
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            //sets all values back to standard
            obstacleArray = [];
            grassPoints = 0;
            firePoints = 0;
            waterPoints = 0;
            totalPoints = 0;
            hasUserLost = false;

            showUserGrassPoints.innerHTML = grassPoints;
            showUserWaterPoints.innerHTML = waterPoints;
            showUserFirePoints.innerHTML = firePoints;
            showUserTotalPoints.innerHTML = totalPoints;

            startGame();
            startButton.remove();
        }
    }
}

createStartButton();

function startGame () {
    animateGame();
    //this function handles the attacks and the collision
    setTimeout(() => {
        generateObstacles();
    }, 100);
}

function handleLoss () {
    hasUserLost = true;
    buttonText = "Play Again!";
    createStartButton();
}

