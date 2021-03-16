import * as audio from '../src/audio.js';
import * as utils from '../src/utils.js';
import * as classes from '../src/firework.js';

const canvasWidth = 400, canvasHeight = 300;
let ctx;

//const imgURL = "http://clipart-library.com/new_gallery/77-771163_free-disneyland-castle-clipart-disney-castle-logo-png.png";
const imgURL = "https://people.rit.edu/jrt5717/330/project1/castledisney.png";
const DEFAULTS = Object.freeze({
    sound1: "audio/not_in_love.mp3",
    sound2: "audio/Remember-The-Magic-Parade.mp3",
    sound3: "audio/Disneyland_61.mp3",
    sound4: "audio/Disney-Studios.mp3",
    sound5: "audio/a_whole_new_world.mp3",
    sound5: "audio/bare_necessities.mp3",
});
const playButton = document.querySelector("#playButton");
const volumeSlider = document.querySelector("#volumeSlider");
const volumeLabel = document.querySelector("#volumeLabel");
const colorSlider = document.querySelector("#colorSlider");
const colorLabel = document.querySelector("#colorLabel");
let timeOut;
let firework1, firework2;
let angle;

window.onload = init;

function init() {
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    //divergence for firework
    angle = parseInt(volumeLabel.innerHTML) + 100;

    //create firwwork
    firework1 = new classes.Firework(75, 100, 50, colorSlider.value, 0,  angle, 400);
    firework2 = new classes.Firework(325, 100, 50, colorSlider.value, 0, angle, 400);

    //load image
    let image = utils.preloadImage(imgURL, function (image) {
        
        console.log("image loaded");
        ctx.drawImage(image, 100, 100, 200, 200);
    });

    audio.setupWebaudio(DEFAULTS);
    setupUI();

    //when play button is clicked
    playButton.onclick = e => {
        
        audio.loadSoundFile(trackSelect.value);
        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
            timeOut = setTimeout(loop, 1000 / 10);
        }
        //if playing
        if (e.target.dataset.playing == "no") {
            audio.playCurrentSound();
            e.target.dataset.playing = "yes";
            timeOut = setTimeout(loop, 1000 / 10);
        //if not playing
        } else {
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no";
            clearTimeout(timeOut);
        }
    }

    //color of sqaure based on value of color slider
    colorLabel.style.color = `hsl(${colorSlider.value}, 100%,50%)`;    

}

function setupUI() {
    //when vol slider is changed
    volumeSlider.oninput = e => {
        angle = parseInt(volumeLabel.innerHTML) + 100;
        audio.setVolume(e.target.value);
        volumeLabel.innerHTML = Math.round(e.target.value / 2 * 100);
    };

    volumeSlider.dispatchEvent(new Event("input"));

    //when song is changed
    let trackSelect = document.querySelector("#trackSelect");
    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);
        if (playButton.dataset.playing = "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
    };

    //when color slider is changed
    colorSlider.oninput = e => {
        colorLabel.style.color = `hsl(${colorSlider.value}, 100%,50%)`;
        firework1.updateColor(e.target.value);
        firework2.updateColor(e.target.value);
    };

}


function loop(play) {
    //castle image
    utils.preloadImage(imgURL, function (image) {
        ctx.drawImage(image, 100, 100, 200, 200);
    });

    //loop
    timeOut = setTimeout(loop, 1000 / 10);

    //start firework
    firework1.explode(ctx);
    firework2.explode(ctx);

    //changes y value
    let randomY = utils.getRandom(50,250);

    //once firework is finished will reset it
    if(firework1.explode(ctx) == false){
        firework1.reset(angle, randomY);
    }

    if(firework2.explode(ctx) == false){
        firework2.reset(angle, randomY);
    }
}


export { init };