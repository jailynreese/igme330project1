import * as audio from '../src/audio.js';
import * as utils from '../src/utils.js';

        const canvasWidth = 400, canvasHeight = 300;
		let ctx;
		let n = 0;
		const c = 1.4;
		const divergence = 137.99;

		const imgURL = "http://clipart-library.com/new_gallery/77-771163_free-disneyland-castle-clipart-disney-castle-logo-png.png";

        const DEFAULTS = Object.freeze({
            sound1: "audio/not_in_love.mp3",
            sound2: "audio/Remember-The-Magic-Parade.mp3",
            sound3: "audio/Disneyland_61.mp3",
            sound4: "audio/Disney-Studios.mp3",
            sound5: "audio/a_whole_new_world.mp3",
            sound5: "audio/bare_necessities.mp3",
        });

		window.onload = init;

		function init() {
			ctx = canvas.getContext("2d");
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			ctx.fillRect(0, 0, canvasWidth, canvasHeight);
			//loop();

			utils.preloadImage(imgURL, function (image) {
				loop(image);
				console.log("image loaded");	
				ctx.drawImage(image, 100,100, 200,200);
            });
            
            audio.setupWebaudio(DEFAULTS);
            setupUI();
        }
        
        function setupUI(){
            let volumeSlider = document.querySelector("#volumeSlider");
            let volumeLabel = document.querySelector("#volumeLabel");

            volumeSlider.oninput = e => {
                audio.setVolume(e.target.value);
                volumeLabel.innerHTML = Math.round(e.target.value/2*100);
            };

            volumeSlider.dispatchEvent(new Event("input"));

            let trackSelect = document.querySelector("#trackSelect");
            trackSelect.onchange = e => {
                audio.loadSoundFile(e.target.value);
                if(playButton.dataset.playing = "yes"){
                    playButton.dispatchEvent(new MouseEvent("click"));
                }
            };

            const playButton = document.querySelector("#playButton");

            playButton.onclick = e => {
                audio.loadSoundFile(trackSelect.value);
                if(audio.audioCtx.state == "suspended"){
                    audio.audioCtx.resume();
                }
                if(e.target.dataset.playing == "no"){
                    audio.playCurrentSound();
                    e.target.dataset.playing = "yes";
                } else {
                    audio.pauseCurrentSound();
                    e.target.dataset.playing = "no";
                }
            }
        }


		function loop(image) {

            if(n > 100){
                n = 0;
                ctx.fillRect(0, 0, canvasWidth, canvasHeight, "black");
            }

            utils.preloadImage(imgURL, function (image) {
				ctx.drawImage(image, 100,100, 200,200);
            });

            phyllotaxis(canvasWidth/4, canvasHeight/4);

        }

        function phyllotaxis(xInput, yInput){
            // each frame draw a new dot
            // `a` is the angle
            // `r` is the radius from the center (e.g. "Pole") of the flower
            // `c` is the "padding/spacing" between the dots
            let a = n * utils.dtr(divergence);
            let r = c * Math.sqrt(n);
            setTimeout(loop, 1000 / 30);
            n++;
            // now calculate the `x` and `y`
            let x = r * Math.cos(a) + xInput;
            let y = r * Math.sin(a) + yInput;
            let aDegrees = (n * ((Math.PI / 2) % divergence)) % 225;
            let color = `rgb(${aDegrees},24,175)`;
            utils.drawCircle(ctx, x, y, 2, color);
        }

           
        export{init};