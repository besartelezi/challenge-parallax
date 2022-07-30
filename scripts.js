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
let obstacleInterval = 1500;

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
        this.y = Math.random() * canvas.height;
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
let currentPokemon = torchic;

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
const keys = [];
//array of obstacle Pokémon
const obstacleArray = [];
//array of Pokémon attacks
const pokemonAttacksArray = [];

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
})
window.addEventListener('keyup', (e) => {
    delete keys[e.key];
})

function animate () {
    //clears prior drawing on the canvas
    canvasContext.clearRect(0, 0,  CANVAS_WIDTH, CANVAS_HEIGHT)
    //call on the update and draw functions on each of the layers
    layerArray.forEach(layer => {
        layer.update();
        layer.draw();
    })
    //draws current Pokémon
    //used current Pokémon variable because I want to re-use this function for all Pokémon the user has
    //TODO: if I find another way to switch between Pokémon, this piece of code might become obsolete
    drawPokemon(currentPokemon.image, currentPokemon.x, currentPokemon.y, currentPokemon.width, currentPokemon.height, currentPokemon.x, currentPokemon.y);
    //calls move pokemon function
    movePokemon();
    animateAttack();
    animateObstacles();
    requestAnimationFrame(animate);
}

animate();
setTimeout(() => {
    generateObstacles();
    console.log(obstacleArray)
}, 0);

//moving the user's Pokémon
function movePokemon () {
    //added '&&' so the users pokemon can't leave the screen
    if (keys["ArrowUp"] && currentPokemon.y > 0) {
        //created this if statement, so that all the x and the y will stay the same
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
        }    }
    //TODO: find spacebar key
    if (keys["a"]) {
        shootAttack();
    }
    if (keys["z"]) {
        currentPokemon = mudkip;
    }
    if (keys["e"]) {
        currentPokemon = treecko;
    }
    if (keys["r"]) {
        currentPokemon = torchic;
    }
}

function generateObstacles () {
    //TODO: expand math random and add other Pokémon Obstacles
    if (Math.round(Math.random())) {
        obstacleArray.push(new ObstaclePokemon("Ivysaur", ivysaurImage, grass, 153, 150, 2))
    }
    else{
        obstacleArray.push(new ObstaclePokemon("Zigzagoon" ,zigzagoonImage, normal, 136, 100, 1));
    }
    setTimeout(generateObstacles, obstacleInterval);
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

function animateObstacles () {
    obstacleArray.forEach((obstacle, index) => {
        obstacle.draw();
        obstacle.update();
        //removes items from array when they leave screen
        if ((obstacleArray.x + obstacleArray.width) <=0) {
            setTimeout(() => {
                obstacleArray.splice(index, 1);
            }, 0)
        }
        //detects collision between player and obstacles
        //TODO: rework hitboxes
        if (currentPokemon.x < obstacle.x + obstacle.width &&
            currentPokemon.x + currentPokemon.width > obstacle.x &&
            currentPokemon.y < obstacle.y + obstacle.height &&
            currentPokemon.y + currentPokemon.height > obstacle.y
        ) {
            alert('ya dead buddy');
            location.reload();
        }
    });
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