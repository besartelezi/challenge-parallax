const canvas = document.getElementById("canvas");

// variable that calls on the context of the selected canvas
// getContext is a built-in function that only works for canvas
const canvasContext = canvas.getContext('2d');

//set in all caps because this is a global variable
//the global width needs to be the same as the width you selected in the css
const CANVAS_WIDTH = canvas.width = 960;
const CANVAS_HEIGHT = canvas.height = 600;

let gameSpeed = 1;

//adds new Images
const backgroundLayer1 = new Image();
backgroundLayer1.src = "./resources/game-images/01-sky.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "./resources/game-images/02-sea.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "./resources/game-images/03-lapras.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "./resources/game-images/04-clouds.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "./resources/game-images/05-trees.png";
const backgroundLayer6 = new Image();
backgroundLayer6.src = "./resources/game-images/06-grass.png";

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
        console.log("update works")

        this.speed = gameSpeed * this.speedModifier
        if (this.x <= -this.width){
            //this is the formula needed to get rid of whitespace in between the looped images
            //there will always be a gap equal to the gamespeed, and if the canvas_width isn't perfectly divisible by the gameSpeed, another gap will appear
            //This way it won't matter what the gamespeed is, there won't be a gap in between the images in the canvas
            this.x = this.width + this.x2 - this.speed
            console.log("if 1 works in update")
        }
        if (this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed
            console.log("if 2 works in update")

        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }

    draw () {
        //draws the images on the canva
        canvasContext.drawImage(this.image, this.x, this.y, this.width, this.height)
        canvasContext.drawImage(this.image, this.x2, this.y, this.width, this.height)
    }
}

//creating all the layers in the parallax
const layerSky = new ParallaxBackgroundLayer(backgroundLayer1, 0.25)
const layerSea = new ParallaxBackgroundLayer(backgroundLayer2, 0.5)
const layerLapras = new ParallaxBackgroundLayer(backgroundLayer3, 1.5)
const layerClouds = new ParallaxBackgroundLayer(backgroundLayer4, 2.5)
const layerTrees = new ParallaxBackgroundLayer(backgroundLayer5, 3.5)
const layerGrass = new ParallaxBackgroundLayer(backgroundLayer6, 5)


function animateBackground () {
    //clears prior drawing on the canvas
    canvasContext.clearRect(0, 0,  CANVAS_WIDTH, CANVAS_HEIGHT)

    //calls all the functions on all the layers
    layerSky.update();
    layerSky.draw();
    layerSea.update();
    layerSea.draw();
    layerLapras.update();
    layerLapras.draw();
    layerClouds.update();
    layerClouds.draw();
    layerTrees.update();
    layerTrees.draw();
    layerGrass.update();
    layerGrass.draw();
    requestAnimationFrame( animateBackground)
}
animateBackground()
