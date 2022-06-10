////////////////////
//////Config
////////////////////
let cs = 2000;
let cs2 = cs * 0.5;
// format: https://coolors.co/....
let palettes = [
    "https://coolors.co/fff275-ff8c42-ff3c38-a23e48-6c8ead-083d77-220901-621708-919098-cab6cd",
];
let permutePalettes = true;

////////////////////
//////Sketch
////////////////////
function makeSketch() {
    let b = new Box(500, 500, 1000, 1000);
    pg.background(palette[1]);

    pg.fill(palette[3]);
    pg.rect(b.x, b.y, b.w, b.h);

    pg.rectMode(CENTER);
    pg.fill(palette[0]);
    pg.rect(b.tl.x, b.tl.y, 400, 400);
    pg.fill(palette[2]);
    pg.rect(b.br.x, b.br.y, 400, 400);
}
