////////////////////
//////Config
////////////////////
let cs = 2000;
let cs2 = cs * 0.5;
// format: https://coolors.co/....
let palettes = [
    //"https://coolors.co/fff275-ff8c42-ff3c38-a23e48-6c8ead-083d77-220901-621708-919098-cab6cd",
    //"https://coolors.co/ffffff-ffffff-ffffff-000000",
    "https://coolors.co/000000-ffffff-ffffff-ffffff",
    //"https://coolors.co/ffffff-000000-ffffff-ffffff",
];

// bauhaus
palettes = [
    "https://coolors.co/ebe7dc-ed4316-0d52da-f399bf-0c8d55-f3be0b",
    "https://coolors.co/f8dbbb-0065bd-ffb700-e02d26",
    "https://coolors.co/393e46-00adb5-f8b500-fc3c3c-ffffff",
    "https://coolors.co/ffaea3-f5ae05-ffe9bd-fd2c05",
];

// // nice small
// palettes = [
//     //"https://coolors.co/ff000d-004ce1-fec605-fe99c3-018739-f4eeeb",
//     //soft 2
//     //'https://coolors.co/579fae-dfa6ad-476e59-ba4033-e7dcbe-f1cb42-1b191a',
//     // bauhuas soft
//     //'https://coolors.co/4d667a-1e1d19-f79f21-e8dabd-6d150f',
//     // soft 3
//     // 'https://coolors.co/eaa4ae-1b1b1d-cd342f-ecdbbd-f3c361-29a1ad-336f56',
//     // // metro
//     // 'https://coolors.co/185f71-1e1e28-f6ac25-e41a26-e8e2d6'
//     // die farbe
//     //'https://coolors.co/e88c05-f2593a-ded4bb-cf1c2f-46618c-63ad72-b5949b'
//     //warsaw
//     //'https://coolors.co/1fa1ba-ffa834-f05026-016786-f1516b-428c38'
// ];

palettes = [
    // soft
   // 'https://coolors.co/ec98ac-f4f1d7-e31d34-2b2671-c5dba5-90d0e3-f4bc6d-89c9b8-221e1f',
    // 2
   // "https://coolors.co/ff85a1-fffacc-ff001e-0a0099-ccff80-75dfff-ffbd61-52ffd1-420011",

    'https://coolors.co/palette/337556-ee3b10-143b74-b9beb8-fffbe5-131426-e38891-f99707-61b7ac',
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
function makeSketch() {
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




    //fillBox(b)
}
