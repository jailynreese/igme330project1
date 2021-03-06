import * as audio from '../src/audio.js';
import * as utils from '../src/utils.js';

class Firework {
    constructor(x, y, size, color, n = 0, divergence = 137.99, yFirework) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.n = n;
        this.divergence = divergence;
        this.yFirework = yFirework;
    }

    explode(ctx) {

        //shoot up while yFirework gets to desired y value
        if (this.yFirework > this.y) {
            utils.drawCircle(ctx, this.x, this.yFirework, 2, "rgba(255,255,255,0.7)");
            this.yFirework -= 10;

            //create phyllotax until given size 
        } else if (this.n < this.size) {
            // each frame draw a new dot
            // `a` is the angle
            // `r` is the radius from the center (e.g. "Pole") of the flower
            // `c` is the "padding/spacing" between the dots
            setTimeout(50 / 12);

            let a = this.n * utils.dtr(this.divergence);
            //c = 4 
            let r = 4 * Math.sqrt(this.n);
            this.n++;
            // now calculate the `x` and `y`
            let circleX = r * Math.cos(a) + this.x;
            let circleY = r * Math.sin(a) + this.y;
            let aDegrees = (this.n * ((Math.PI / 2) % this.divergence)) % 225;
            let colors = `hsl(${this.color}, 100%,50%)`;
            utils.drawCircle(ctx, circleX, circleY, 2, colors);
        } else {
            return false;
        }

        //allows fireworks to fade
        const fps = 30;
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.globalAlpha = 1 / fps;
        ctx.fillRect(0, 0, 600, 400);
        ctx.restore();
    }

    //starts at bottom again
    reset(angle, y) {
        this.y = y;
        this.divergence = angle;
        this.n = 0;
        this.yFirework = 400;
    }

    //changes color when slider value changes
    updateColor(hsv){
        this.color = hsv;
    }
}

export { Firework };
