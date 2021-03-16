function drawCircle(ctx, x, y, radius, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

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

    return img;
}

function dtr(degrees) {
    return degrees * (Math.PI / 180);
}

function getRandom(min,max){
    let random = Math.floor(Math.random() * (max - min)) + min;
    return random;
}

export {preloadImage, drawCircle, dtr, getRandom};