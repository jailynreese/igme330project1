import * as audio from '../src/audio.js';
import * as utils from '../src/utils.js';
import * as classes from '../src/firework.js';

const canvasWidth = 400, canvasHeight = 300;
let ctx;
// let n = 0;
// const c = 1.4;
// const divergence = 137.99;


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

let firework1, firework2;
let volumeSlider = document.querySelector("#volumeSlider");
let volumeLabel = document.querySelector("#volumeLabel");

window.onload = init;

function init() {
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    let angle = parseInt(volumeLabel.innerHTML) + 100;
    console.log(angle);
    firework1 = new classes.Firework(75, 100, 50, "yellow", 0,  angle, 400);
    firework2 = new classes.Firework(325, 100, 50, "yellow", 0, angle, 400);

    let image = utils.preloadImage(imgURL, function (image) {
        
        console.log("image loaded");
        ctx.drawImage(image, 100, 100, 200, 200);
    });

    audio.setupWebaudio(DEFAULTS);
    setupUI();

    const playButton = document.querySelector("#playButton");

    playButton.onclick = e => {

        audio.loadSoundFile(trackSelect.value);
        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
            loop();
        }
        if (e.target.dataset.playing == "no") {
            audio.playCurrentSound();
            e.target.dataset.playing = "yes";
            loop();
        } else {
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no";
        }
    }

}

function setupUI() {

    volumeSlider.oninput = e => {
        audio.setVolume(e.target.value);
        volumeLabel.innerHTML = Math.round(e.target.value / 2 * 100);
    };

    volumeSlider.dispatchEvent(new Event("input"));

    let trackSelect = document.querySelector("#trackSelect");
    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);
        if (playButton.dataset.playing = "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
    };

}


function loop(play) {

    utils.preloadImage(imgURL, function (image) {
        ctx.drawImage(image, 100, 100, 200, 200);
    });


    setTimeout(loop, 1000 / 10);

    firework1.explode(ctx);
    firework2.explode(ctx);
    let randomY = Math.random() * 400 - 20;
    //once firework is finished will reset it
    if(firework1.explode(ctx) == false){
        firework1.reset(volumeLabel.innerHTML + 100, randomY);
    }

    if(firework2.explode(ctx) == false){
        firework2.reset(volumeLabel.innerHTML + 100, randomY);
    }
}


export { init };