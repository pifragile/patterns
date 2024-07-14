let pg;
let cs = 8000//isRendering ? 8000 : 3000;

function draw() {
    seedRandomness();
    pg.clear();
    drawArt();
    setImage();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        save();
    }
}

function setup() {
    noLoop();
    is = min(windowHeight, windowWidth);
    cs = round((is + 1000) * 1000) / 1000
    let canvas = createCanvas(is, is).elt;

    pg = createGraphics(cs, cs);
    pg.colorMode(HSB);
}

let palette;
function setPalette() {
    if (palettes.length > 0) {
        palette = randomElem(palettes, random1ofx);
        palette = palette
            .split("https://coolors.co/")[1]
            .split("-")
            .map((x) => pg.color(`#${x}`));
        if (permutePalettes) palette = shuffleArr(palette, random1ofx);
    }
}


function setImage() {
    clear();

    is = min(windowHeight, windowWidth);
    resizeCanvas(is, is, true);
    img = pg.get()
    image (img, 0, 0, is, is)
    //copy(pg, 0, 0, is, is, 0, 0, is, is)
}

function preload() {
    myShader = loadShader("shader.vert", "shader.frag");
}
let myShader;

let palettes = [
    "https://coolors.co/palette/337556-ee3b10-143b74-b9beb8-fffbe5-131426-e38891-f99707-61b7ac",
];

let permutePalettes = true;

////////////////////
//////Sketch
////////////////////

function drawCurve(b) {
    let x1 = b.c.x;
    let y1 = b.bl.y;

    let x2 = b.br.x;
    let y2 = b.c.y;

    let f = 0.1 * b.w;
    let f2 = 0.1 * b.w;

    let ax1 = b.c.x + f;
    let ay1 = b.c.y + f;

    let ax2 = b.br.x - f2;
    let ay2 = b.br.y - f2;

    pg.bezier(x1, y1, ax1, ay1, ax2, ay2, x2, y2);
}

function fillBox(b) {
    let sw = 0.001 * b.w;
    pg.strokeWeight(sw);
    pg.stroke(palette[3]);

    drawCurve(b);
    pg.push();
    pg.scale(-1, 1);
    pg.translate(-(2 * b.x + b.w), 0);
    pg.strokeWeight(sw);
    pg.stroke(palette[3]);
    drawCurve(b);
    pg.pop();

    pg.push();
    pg.scale(1, -1);
    pg.translate(0, -(2 * b.y + b.h));

    drawCurve(b);
    pg.push();
    pg.scale(-1, 1);
    pg.translate(-(2 * b.x + b.w), 0);
    pg.strokeWeight(sw);
    pg.stroke(palette[3]);
    drawCurve(b);
    pg.pop();

    pg.pop();
}
function drawArt() {
    //cs = min(windowHeight, windowWidth)
    pg.smooth()
    noiseSeed(random1ofx() * 99999999999999)
    for (let _i = 0; _i < 14; _i++) {
        random1ofx();
    }
    setPalette();
    let b = new Box(0.08 * cs, 0, cs * 0.84, cs);
    let margin = 0.15;
    let w = 1 - 2 * margin;
    b = new Box(margin * cs, margin * cs, w * cs, w * cs);

    pg.background(palette[1]);

    pg.fill(palette[2]);
    pg.noStroke();
    b.rect();

    pg.noFill()
    let gs = 4;
    let grid = b.gridify(gs, gs);
    //grid.forEach((r) => r.forEach((bo) => fillBox(bo)));

    let nf = 0.03
    for (let k = 0; k < 100; k++) {
        for (let i = 0; i < gs; i++) {
            for (let j = 0; j < gs; j++) {
                let box = grid[j][i];
                pg.push();
                pg.translate(0, noise(i * nf, k * nf) * box.h - 0.09 * b.h);
                fillBox(box);
                pg.pop();
            }
        }
    }


}

function shuffleArr(array, rand) {
    array = [...array];
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(rand() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}

function randomElem(array, rand) {
    return array[Math.floor(rand() * array.length)];
}

function linearElem(array, val) {
    return array[Math.floor(val * array.length)];
}


function windowResizedUser() {
    setImage()
}