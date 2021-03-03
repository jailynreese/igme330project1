const canvasWidth = 400, canvasHeight = 300;
		let ctx;
		let n = 0;
		const c = 1.4;
		const divergence = 137.99;

		let imgURL = "http://clipart-library.com/new_gallery/77-771163_free-disneyland-castle-clipart-disney-castle-logo-png.png";

		function preloadImage(url, callback) {
			// 1 - create a new Image object
			let img = new Image();

			// 2 - set up event handlers for the Image object
			img.onload = _ => {
				// 4 - when the image shows up, call `init(img)`
				callback(img)
			};

			img.onerror = _ => {
				// 4B - called if there is an error
				console.log(`Image at url "${url}" wouldn't load! Check your URL!`);
			};

			// 3 - start downloading the image (it is located on an RIT server)
			img.src = url;
		}


		window.onload = init;

		function init() {
			ctx = canvas.getContext("2d");
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			ctx.fillRect(0, 0, canvasWidth, canvasHeight);
			//loop();

			preloadImage(imgURL, function (image) {
				loop(image);
				console.log("image loaded");	
				ctx.drawImage(image, 100,100, 200,200);
			});
		}


		// helpers
		function dtr(degrees) {
			return degrees * (Math.PI / 180);
		}

		function drawCircle(ctx, x, y, radius, color) {
			ctx.save();
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		}

		function loop(image) {

            if(n > 100){
                n = 0;
                ctx.fillRect(0, 0, canvasWidth, canvasHeight, "black");
            }

            phyllotax();

        }

        function phyllotax(){
            // each frame draw a new dot
			// `a` is the angle
			// `r` is the radius from the center (e.g. "Pole") of the flower
			// `c` is the "padding/spacing" between the dots
			let a = n * dtr(divergence);
			let r = c * Math.sqrt(n);
			setTimeout(loop, 1000 / 30);
			n++;
			// now calculate the `x` and `y`
			let x = r * Math.cos(a) + canvasWidth / 4;
			let y = r * Math.sin(a) + canvasHeight / 4;
			let aDegrees = (n * ((Math.PI / 2) % divergence)) % 225;
			let color = `rgb(${aDegrees},24,175)`;
			drawCircle(ctx, x, y, 2, color);
        }
        
        export{init};