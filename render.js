var canvas = document.getElementById('canvas');
var sprites = document.getElementById('sprites');
var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

bgSprite = {x: 0, y: 0, w: 288, h: 512, scale: 1}
floorSprite = {x: 292, y: 0, w: 288, h: 112, scale: 1}
birdSprite = [{x: 528, y: 128, w: 34, h: 25, scale: 1},
              {x: 528, y: 180, w: 34, h: 25, scale: 1},
              {x: 446, y: 248, w: 34, h: 25, scale: 1},
              {x: 528, y: 180, w: 34, h: 25, scale: 1}]
bottomPipeSprite = {x: 660, y: 0, w: 52, h: 270, scale: 1}
topPipeSprite = {x: 604, y: 0, w: 52, h: 270, scale: 1}
numSprite = [{x: 576, y: 200, w: 14, h: 20, scale: 1.5},
             {x: 580, y: 236, w: 14, h: 20, scale: 1.5},
             {x: 578, y: 268, w: 14, h: 20, scale: 1.5},
             {x: 578, y: 300, w: 14, h: 20, scale: 1.5},
             {x: 574, y: 346, w: 14, h: 20, scale: 1.5},
             {x: 574, y: 370, w: 14, h: 20, scale: 1.5},
             {x: 330, y: 490, w: 14, h: 20, scale: 1.5},
             {x: 350, y: 490, w: 14, h: 20, scale: 1.5},
             {x: 370, y: 490, w: 14, h: 20, scale: 1.5},
             {x: 390, y: 490, w: 14, h: 20, scale: 1.5}]

function drawSprite(sprite, x, y) {
    ctx.drawImage(sprites, sprite.x, sprite.y, sprite.w, sprite.h,
                  x, y, sprite.scale*sprite.w, sprite.scale*sprite.h);
}

function renderBird() {
    flapSpeed = 6
    // iterate through sprites (flap animation)
    birdState = Math.floor((time % (4*flapSpeed)) / flapSpeed);
    ctx.save();
    ctx.translate(bird.x + birdSprite[0].w/2, bird.y + birdSprite[0].h/2);
    ctx.rotate(-bird.dy * 5 * (Math.PI/180));
    drawSprite(birdSprite[birdState], -birdSprite[0].w/2, -birdSprite[0].h/2);
    ctx.restore();
}

function renderPipes() {
    for (var i = 0; i < pipes.length; ++i) {
        if (pipes[i].y === 0) {
            drawSprite(topPipeSprite, pipes[i].x, pipes[i].h - topPipeSprite.h);
        }
        else {
            drawSprite(bottomPipeSprite, pipes[i].x, pipes[i].y);
        }
    }
}

function renderGameOver() {
    sprite = {x: 292, y: 397, w: 188, h: 39};
    drawSprite(sprite, 50, 200);
}

function renderScore() {
    numbers = score.toString(10).split("").map(Number);
    padding = 2;
    scale = numSprite[0].scale;
    width = numSprite[0].w;
    offset = W/2; // center of canvas
    offset -= numbers.length * width/2 * scale; // left to center numbers
    offset -= padding * (numbers.length - 1); // left to adjust for padding
    for (var i = 0; i < numbers.length; ++i) {
        drawSprite(numSprite[numbers[i]], offset + i*width*scale + i*padding*2, 50);
    }
}

function renderBackground() {
    drawSprite(bgSprite, 0, 0);
}

function renderFloor() {
    // animate floor
    floorSprite.x = 292 + (time * SPEED % 14);
    drawSprite(floorSprite, 0, 400);
}

function render() {
    ctx.clearRect(0, 0, W, H);
    renderBackground();
    renderBird();
    renderPipes();
    renderFloor();
    renderScore();
    if (!playing) {
        renderGameOver();
    }
    setTimeout(render, 20);
}

render();
