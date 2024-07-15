let pg;
let cs = isRendering ? 6000 : 2000;

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
    //cs = round((is + 1000) * 1000) / 1000
    let canvas = createCanvas(is, is).elt;

    pg = createGraphics(cs, cs);
    if(mobileAndTabletCheck() && !isRendering){
        pg.pixelDensity(1)
    }
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


const mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };