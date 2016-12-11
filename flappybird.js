var W = 288, H = 400;
var BIRD_WIDTH = 34;
var BIRD_HEIGHT = 26;
var PIPE_WIDTH = 52;
var GRAVITY = -0.5;
var SPEED = 2.0;
var GATE_RATE = 100;
var GATE_HEIGHT = 120;
var FLAPPING = 7;
var bird;
var pipes = [];
var playing;
var time;
var score;

function spawnGate() {
    gateY = Math.floor(Math.random() * (H - GATE_HEIGHT) + GATE_HEIGHT/2)
    gateY = Math.max(GATE_HEIGHT, gateY);
    gateY = Math.min(H - GATE_HEIGHT, gateY);
    pipes.push({x: W, y: 0, w: PIPE_WIDTH, h: gateY - GATE_HEIGHT/2});
    pipes.push({x: W, y: gateY + GATE_HEIGHT/2, w: PIPE_WIDTH, h: H - gateY - GATE_HEIGHT/2});
}

function removeInvisibleGates() {
    s = pipes.length;
    pipes = pipes.filter(function (item) {
        return item.x + item.w >= 0;
    });
}

function collision(box1, box2) {
    return box1.x < box2.x + box2.w &&
           box1.x + box1.w > box2.x &&
           box1.y < box2.y + box2.h &&
           box1.y + box1.h > box2.y;
}

function init() {
    bird = {x: W/2 - BIRD_WIDTH/2,
            y: H/2 - BIRD_HEIGHT/2,
            w: BIRD_WIDTH,
            h: BIRD_HEIGHT,
            dy: 0};
    playing = true;
    time = 0;
    score = 0;
    pipes = [];
}

function step() {
    if (playing) {

        for (var i = 0; i < pipes.length; ++i) {
            pipes[i].x -= SPEED;
        }
        removeInvisibleGates();
        if (time % GATE_RATE == 0) {
            spawnGate();
        }

        bird.dy += GRAVITY;
        newBirdBox = {x: bird.x, y: bird.y - bird.dy, w: bird.w, h: bird.h}

        // collisions
        for (var i = 0; i < pipes.length; ++i) {
            if (collision(newBirdBox, pipes[i])) {
                playing = false;
                break;
            }
        }
        if (newBirdBox.y + bird.h >= H) {
            playing = false;
        }
        if (playing) {
            bird.y = newBirdBox.y;
            if (newBirdBox.y < 0) {
                bird.y = 0;
                bird.dy = 0;
            }
        }

        // score and time
        if (time > 0 && time % GATE_RATE == 0) {
            score += 1;
        }
        time += 1;
    }
    setTimeout(step, 20);
}

init();
step();
