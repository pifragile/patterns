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

    let gradient = getBoxGradient(b, 0, 0, 1, 1, palette.slice(0, 3));
    fillGradient(gradient);
    b.rect()

    pg.rectMode(CENTER);
    pg.fill(palette[0]);
    pg.rect(b.tl.x, b.tl.y, 400, 400);

    pg.fill(palette[2]);
    pg.rect(b.br.x, b.br.y, 400, 400);

    let grid = b.gridify(3, 5);

    pg.rectMode(CORNER);
    pg.fill(palette[3]);
    grid[0][4].rect()

    grid[1][0].triangle2('tl')
    grid[1][1].triangle2('tr')
    grid[1][2].triangle2('br')
    grid[1][3].triangle2('bl')

    grid[2][0].triangle4('l')
    grid[2][1].triangle4('t')
    grid[2][2].triangle4('r')
    grid[2][3].triangle4('b')

    grid[0][2].rect()
    grid[0][2].circle(1)

    let grid2 = grid[0][3].gridify(3, 1)
    grid2[1][0].rect()
    grid2[1][0].circle(1)
}
