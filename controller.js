document.onkeydown = function (e) {
    if (e.keyCode === 32) {
        if (playing) {
            bird.dy = FLAPPING;
        }
    }
    else if (e.keyCode === 82) {
        if (!playing) {
            init();
        }
    }
};
