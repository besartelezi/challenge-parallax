const canvas = document.getElementById("canvas");

// variable that calls on the context of the selected canvas
// getContext is a built-in function that only works for canvas
const canvasContext = canvas.getContext('2d');

//set in all caps because this is a global variable
//the global width needs to be the same as the width you selected in the css
const CANVAS_WIDTH = canvas.width = 960;
const CANVAS_HEIGHT = canvas.height = 600;

let gameSpeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "../resources/game-images/01-sky.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "../resources/game-images/02-sea.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "../resources/game-images/03-lapras.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "../resources/game-images/04-clouds.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "../resources/game-images/05-trees.png";
const backgroundLayer6 = new Image();
backgroundLayer6.src = "../resources/game-images/06-grass.png";

let x = 0;
let x2 = 1920

function animateBackground () {
    canvasContext.clearRect(0, 0,  CANVAS_WIDTH, CANVAS_HEIGHT)
    canvasContext.drawImage(backgroundLayer6, x, 0);
    canvasContext.drawImage(backgroundLayer6, x2, 0);

    if (x < -1920) {
        //this is the formula needed to get rid of whitespace in between the looped images
        //there will always be a gap equal to the gamespeed, and if the canvas_width isn't perfectly divisible by the gameSpeed, another gap will appear
        //This way it won't matter what the gamespeed is, there won't be a gap in between the images in the canvas
        x = 1920 + x2 - gameSpeed;
    }
    else {
        x-= gameSpeed;
    }

    if (x2 < -1920) {
        x2 = 1920 +x - gameSpeed;
    }
    else {
        x2 -= gameSpeed;
    }
    requestAnimationFrame(animateBackground)
}
animateBackground()
